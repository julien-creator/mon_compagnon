import pool from "../config/db.js";

class Contact {
    static async create(firstname, lastname, email, message) {
        const INSERT = "INSERT INTO contact (firstname, lastname, email, message) VALUES (?, ?, ? ,? )";
        const [result] = await pool.execute(INSERT, [firstname, lastname, email, message]);
        return { id: result.insertId, firstname, lastname, email, message };
    }

    static async findAll() {
        const SELECT_ALL = `
            SELECT id, firstname, lastname, email, message, 
            CASE 
                WHEN status = 0 THEN 'message non lu' 
                WHEN status = 1 THEN 'message lu' 
            END AS status
            FROM contact
            `;
        const [rows] = await pool.execute(SELECT_ALL);
        return rows;
    }

    static async findById(id) {
        const SELECT_BY_ID = `
            SELECT 
                id, 
                firstname, 
                lastname, 
                email, 
                message, 
                CASE 
                    WHEN status = 0 THEN 'message non lu' 
                    WHEN status = 1 THEN 'message lu' 
                    ELSE 'status inconnu' 
                END AS status
            FROM contact 
            WHERE id = ?;
        `;
        const [rows] = await pool.execute(SELECT_BY_ID, [id]);
        if (rows.length > 0) {
            return rows[0]; // Retourne le contact trouvé
        }
        return null; // Retourne null si aucun contact trouvé
    }

    static async update(status, id) {
        const UPDATE = `
            UPDATE contact 
            SET status = ? 
            WHERE id = ?;
        `;
        const SELECT_UPDATED = `
            SELECT id, firstname, lastname, email, message, 
            CASE 
                WHEN status = 0 THEN 'message non lu' 
                WHEN status = 1 THEN 'message lu' 
            END AS status
            FROM contact
            WHERE id = ?;
        `;

        // Exécution de la mise à jour
        await pool.execute(UPDATE, [status, id]);

        // Sélection du contact mis à jour pour récupérer le statut avec l'affichage conditionnel
        const [rows] = await pool.execute(SELECT_UPDATED, [id]);

        return rows[0];  // Retourne le contact mis à jour avec le nouveau statut sous forme de texte
    }

    static async remove(id) {
        const DELETE = "DELETE FROM contact WHERE id = ?";
        return await pool.execute(DELETE, [id]);
    }
}

export default Contact;