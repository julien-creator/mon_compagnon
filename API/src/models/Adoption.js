import pool from "../config/db.js";

class Adoption {

    static async findAdoption() {
        const SELECT = `
        SELECT 
            a.id AS adoption_id,
            a.receipt_date,
        CASE 
            WHEN a.status = 0 THEN 'demande non lue' 
            WHEN a.status = 1 THEN 'demande lue' 
        END AS status,
            u.lastname,
            u.email,
            u.phone,
            r.name AS resident_name,
            rs.name AS resident_status_name
        FROM 
            adoption a
        JOIN 
            user u ON a.user_id = u.id
        JOIN 
            resident r ON a.resident_id = r.id
        JOIN 
            resident_status rs ON r.status_id = rs.id
        ORDER BY 
            a.receipt_date DESC;
        `;
        const [rows] = await pool.execute(SELECT);
        return rows;
    }

    static async findById(id) {
        const SELECT_BY_ID = `
            SELECT 
                adoption.id, 
                adoption.message, 
                adoption.time_slot, 
                adoption.receipt_date, 
                user.firstname, 
                user.lastname, 
                resident.name AS resident_name, 
                adoption.status
            FROM adoption
            JOIN user ON adoption.user_id = user.id
            JOIN resident ON adoption.resident_id = resident.id
            WHERE adoption.id = ?;
        `;
        const [rows] = await pool.execute(SELECT_BY_ID, [id]);
        if (rows.length > 0) {
            return rows[0]; // Retourne l'adoption trouvée
        }
        return null; // Retourne null si aucune adoption trouvée
    }

    static async create(message, time_slot, user_id, resident_id) {
        // Vérifier que l'utilisateur n'est pas déjà lié à une adoption en cours
        const CHECK_USER_ADOPTION = `
            SELECT * FROM adoption WHERE user_id = ?;
        `;
        const [userAdoption] = await pool.execute(CHECK_USER_ADOPTION, [user_id]);
        if (userAdoption.length > 0) {
            throw new Error("Cet utilisateur a déjà une adoption en cours.");
        }

        // Vérifier que le résident n'est pas déjà adopté ou en cours d'adoption
        const CHECK_RESIDENT_ADOPTION = `
            SELECT * FROM adoption WHERE resident_id = ?;
        `;
        const [residentAdoption] = await pool.execute(CHECK_RESIDENT_ADOPTION, [resident_id]);
        if (residentAdoption.length > 0) {
            throw new Error("Ce résident est déjà en cours d'adoption.");
        }

        // Insérer la nouvelle adoption
        const INSERT = `
            INSERT INTO adoption (message, time_slot, user_id, resident_id ) 
            VALUES (?, ?, ?, ?);
        `;
        const [result] = await pool.execute(INSERT, [message, time_slot, user_id, resident_id]);

        // Retourner les informations de l'adoption créée
        return {
            id: result.insertId,
            message,
            time_slot,
            user_id,
            resident_id,
            status: 0
        };
    }

    static async updateStatus(id, status) {
        const UPDATE = `
            UPDATE adoption 
            SET status = ? 
            WHERE id = ?;
        `;
        await pool.execute(UPDATE, [status, id]);

        // Retourner l'adoption mise à jour
        return await this.findById(id);
    }

    static async remove(id) {
        const DELETE = "DELETE FROM adoption WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }

};

export default Adoption;
