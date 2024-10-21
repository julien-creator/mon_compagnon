import Auth from "../models/Auth.js";
import bcrypt from "bcrypt";

const SALT = 10;

const create = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, birthdate } = req.body;
        const [[user]] = await Auth.findOneByEmail(email);

        if (!user) {
            const hash = await bcrypt.hash(password, SALT);
            const [response] = await Auth.create({ firstname, lastname, email, hash, phone, birthdate });

            if (response.affectedRows === 1) {
                res.status(201).json({ msg: "User created" });
            } else {
                res.status(500).json({ msg: "User not created" });
            }
        } else {
            res.status(400).json({ msg: "User already exists" });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [[user]] = await Auth.findOneByEmail(email);

        if (!user) {
            res.status(400).json({ msg: "User not found" });
        }
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Récupérer directement le rôle ici
                req.session.user = { id: user.id, email: user.email, role: user.role };

                res.status(200).json({
                    msg: "User logged in",
                    isLogged: true,
                    user: { id: user.id, email: user.email, role: user.role },
                });
            } else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        }
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie("connect.sid");
        res.status(200).json({ msg: "User logged out", isLogged: false });
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};

const check_auth = async (req, res) => {
    const { user } = req.session;
    res.json({ isLogged: true, user });
};

export { create, login, logout, check_auth };