import pool from "../config/db.js";

class Breed {
    static async findAll() {
        const SELECT = "SELECT * FROM resident_breed ";
        return await pool.execute(SELECT);
    }
}

export default Breed;