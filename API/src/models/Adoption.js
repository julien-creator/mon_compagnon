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

    static async create(adoptionData) {
        const INSERT = `INSERT INTO adoption (message, time_slot, user_id, resident_id)
                        VALUES (?, ?, ?, ?)
        `;

        return await pool.execute(INSERT, [...Object.values(adoptionData)]);
    }
};

export default Adoption;
