import pool from "../config/db.js";

class ResidentDetail {

    static async findDetailByResidentId(residentId) {
        const SELECT = `SELECT * FROM resident_detail WHERE resident_id = ?`;
        const [rows] = await pool.execute(SELECT, [residentId]);
        return rows[0]; // Retourne le premier résultat s'il existe, sinon null
    }

    static async createDetail(resident_id, datas) {
        const INSERT = `INSERT INTO resident_detail (resident_id, arrival_date, description, provenance, sterilized, categorized, vaccine) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`;
        return await pool.execute(INSERT, [resident_id, ...Object.values(datas)]);
    }

    static async updateDetail(datas, resident_id) {
        const UPDATE = `UPDATE resident_detail 
                        SET arrival_date = ?, description = ?, provenance = ?, sterilized = ?, categorized = ?, vaccine = ? 
                        WHERE resident_id = ?`;
        return await pool.execute(UPDATE, [...Object.values(datas), resident_id]);
    }

}


export default ResidentDetail;