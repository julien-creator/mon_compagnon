import pool from "../config/db.js";

class Adoption {
    static async findAll() {
        const SELECT_ALL = `
            SELECT 
                a.id AS adoption_id,
                a.receipt_date,
                CASE 
                    WHEN a.status = 0 THEN 'demande non traitée' 
                    WHEN a.status = 1 THEN 'demande traitée' 
                    ELSE 'statut inconnu' 
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
        return await pool.query(SELECT_ALL);
    }

    static async findById(id) {
        const SELECT_ONE = `
            SELECT 
                adoption.id, 
                adoption.message, 
                adoption.time_slot, 
                adoption.receipt_date, 
                user.firstname, 
                user.lastname, 
                resident.name AS resident_name, 
                CASE 
                    WHEN adoption.status = 0 THEN 'demande non traitée' 
                    WHEN adoption.status = 1 THEN 'demande traitée' 
                    ELSE 'statut inconnu' 
                END AS status
            FROM adoption
            JOIN user ON adoption.user_id = user.id
            JOIN resident ON adoption.resident_id = resident.id
            WHERE adoption.id = ?;
        `;
        return await pool.execute(SELECT_ONE, [id]);
    }

    static async create(datas) {
        const INSERT = "INSERT INTO adoption (message, time_slot, user_id, resident_id) VALUES (?, ?, ?, ?)";
        return await pool.execute(INSERT, [...Object.values(datas)]);
    }

    static async checkUserAdoption(user_id) {
        const CHECK_USER_ADOPTION = `SELECT id FROM adoption WHERE user_id = ?;`;
        return await pool.execute(CHECK_USER_ADOPTION, [user_id]);
    }

    static async checkResidentAdoption(resident_id) {
        const CHECK_RESIDENT_ADOPTION = `SELECT id FROM adoption WHERE resident_id = ?;`;
        return await pool.execute(CHECK_RESIDENT_ADOPTION, [resident_id]);
    }


    static async updateStatus(id, status) {
        const UPDATE = `
            UPDATE adoption 
            SET status = ? 
            WHERE id = ?;
        `;
        return await pool.execute(UPDATE, [status, id]);

    }

    static async remove(id) {
        const DELETE = "DELETE FROM adoption WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
}

export default Adoption;



