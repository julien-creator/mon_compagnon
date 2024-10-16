import pool from "../config/db.js";

class Resident {
    // Méthode pour récupérer les résidents triés par date d'arrivée
    static async findResidents() {
        const query = `
          SELECT r.id, r.name, r.age, r.sex, r.photo, rb.name AS breed_name, rs.name AS status_name, rd.description, rd.arrival_date
          FROM resident r
          JOIN resident_breed rb ON r.breed_id = rb.id
          JOIN resident_status rs ON r.status_id = rs.id
          JOIN resident_detail rd ON r.id = rd.resident_id
          ORDER BY rd.arrival_date DESC;
        `;

        const [rows] = await pool.execute(query);
        return rows;
    }

    // Requête pour les détails d'un résident
    static async findById(id) {
        const SELECT_BY_ID = `
        SELECT r.id, r.name, r.age, r.sex, r.photo, r.specie, rb.name AS breed_name, rs.name AS status_name, rd.description, rd.arrival_date, rd.provenance, rd.sterilized, rd.categorized, rd.vaccine
        FROM resident r
        JOIN resident_breed rb ON r.breed_id = rb.id
        JOIN resident_status rs ON r.status_id = rs.id
        JOIN resident_detail rd ON r.id = rd.resident_id
        WHERE r.id = ?;
    `;
        const [rows] = await pool.execute(SELECT_BY_ID, [id]);
        return rows.length > 0 ? rows[0] : null;
    }
}

export default Resident;