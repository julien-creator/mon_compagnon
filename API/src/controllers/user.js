import User from "../model/User.js"; // Modèle pour les utilisateurs
import bcrypt from "bcrypt";

// Récupérer la liste de tous les utilisateurs (route réservée à l'admin)
const getAllUsers = async (req, res) => {
    try {
        const [users] = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Erreur lors de la récupération des utilisateurs", error });
    }
};

// Supprimer un utilisateur par son id (route réservée à l'admin)
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [response] = await User.remove(id);
        if (response.affectedRows === 1) {
            res.status(200).json({ msg: `Utilisateur avec l'id ${id} supprimé.` });
        } else {
            res.status(404).json({ msg: "Utilisateur non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur lors de la suppression de l'utilisateur", error });
    }
};

// Modifier un utilisateur par son id (admin ou utilisateur lui-même)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, phone, password } = req.body;

    try {
        // Rechercher l'utilisateur par son id
        const [[user]] = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "Utilisateur non trouvé." });
        }

        // Si le mot de passe est présent dans la requête, le hacher avant de mettre à jour
        let hashedPassword = user.password; // Garder le mot de passe actuel si non modifié
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const [response] = await User.update({
            id,
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword,
        });

        if (response.affectedRows === 1) {
            res.status(200).json({ msg: "Utilisateur mis à jour avec succès." });
        } else {
            res.status(400).json({ msg: "Impossible de mettre à jour l'utilisateur." });
        }
    } catch (error) {
        res.status(500).json({ msg: "Erreur lors de la mise à jour de l'utilisateur", error });
    }
};

// Récupérer un utilisateur par son id (pour admin ou utilisateur lui-même)
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [[user]] = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "Utilisateur non trouvé." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Erreur lors de la récupération de l'utilisateur", error });
    }
};

export { getAllUsers, deleteUser, updateUser, getUserById };