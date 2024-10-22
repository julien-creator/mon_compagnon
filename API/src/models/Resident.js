import pool from "../config/db.js";

class Resident {
    // Méthode pour récupérer les résidents triés par date d'arrivée
    static async findResidents() {
        const SELECT = `
          SELECT r.id, r.name, r.age, r.sex, r.photo, rb.name AS breed_name, rs.name AS status_name, rd.description, rd.arrival_date
          FROM resident r
          JOIN resident_breed rb ON r.breed_id = rb.id
          JOIN resident_status rs ON r.status_id = rs.id
          LEFT JOIN resident_detail rd ON r.id = rd.resident_id
          ORDER BY rd.arrival_date DESC;
        `;

        const [rows] = await pool.execute(SELECT);
        return rows;
    }

    // Requête pour les détails d'un résident
    static async findById(id) {
        const SELECT_BY_ID = `
        SELECT r.id, r.name, r.age, r.sex, r.photo, r.specie, rb.name AS breed_name, rs.name AS status_name, rd.description, rd.arrival_date, rd.provenance, rd.sterilized, rd.categorized, rd.vaccine
        FROM resident r
        JOIN resident_breed rb ON r.breed_id = rb.id
        JOIN resident_status rs ON r.status_id = rs.id
        LEFT JOIN resident_detail rd ON r.id = rd.resident_id
        WHERE r.id = ?;
    `;
        const [rows] = await pool.execute(SELECT_BY_ID, [id]);
        return rows.length > 0 ? rows[0] : null;
    }



    static async create(datas) {
        const INSERT = `INSERT INTO resident (name, age, sex, photo, specie, breed_id, status_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return await pool.execute(INSERT, [...Object.values(datas)]);
    }

    static async update(datas, id) {
        const UPDATE = `UPDATE resident 
                        SET name = ?, age = ?, sex = ?, photo = ?, specie = ?, breed_id = ?, status_id = ? 
                        WHERE id = ?`;
        return await pool.execute(UPDATE, [...Object.values(datas), id]);
    }

    static async remove(id) {
        const DELETE = `DELETE FROM resident WHERE id = ?`;
        return await pool.execute(DELETE, [id]);
    }
}

export default Resident;