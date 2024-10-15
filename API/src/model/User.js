import pool from "../config/db.js";

class User {
    static async findAll() {
        const SELECT_ALL_USERS = "SELECT id, firstname, lastname, email, phone, role FROM user";
        return await pool.execute(SELECT_ALL_USERS);
    }

    static async findById(id) {
        const SELECT_USER = "SELECT id, firstname, lastname, email, phone, role FROM user WHERE id = ?";
        return await pool.execute(SELECT_USER, [id]);
    }

    static async remove(id) {
        const DELETE_USER = "DELETE FROM user WHERE id = ?";
        return await pool.execute(DELETE_USER, [id]);
    }

    static async update(data) {
        const UPDATE_USER = `
            UPDATE user 
            SET firstname = ?, lastname = ?, email = ?, phone = ?, password = ? 
            WHERE id = ?
        `;
        return await pool.execute(UPDATE_USER, [
            data.firstname,
            data.lastname,
            data.email,
            data.phone,
            data.password,
            data.id,
        ]);
    }
}

export default User;