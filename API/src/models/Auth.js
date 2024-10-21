
import pool from "../config/db.js";

class Auth {
    static async create(datas) {
        const INSERT = "INSERT INTO user (firstname, lastname, email, password, phone, birthdate) VALUES (?, ?, ?, ?, ?, ?)";
        return await pool.execute(INSERT, [...Object.values(datas)]);
    }

    static async findOneByEmail(email) {
        const SELECT =
            "SELECT id, email, password, role FROM `user` WHERE email = ?";
        return await pool.execute(SELECT, [email]);
    }

}



export default Auth;










/*static async findUserInfoById(id) {
    const SELECT = "SELECT firstname, lastname, email, phone, birthdate, role, label AS avatar FROM user LEFT JOIN avatar ON user.avatar_id = avatar.id WHERE user.id = ?";
    return await pool.execute(SELECT, [id]);
}*/