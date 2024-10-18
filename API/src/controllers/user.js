import User from "../models/User.js"; // Modèle pour les utilisateurs


// Récupérer la liste de tous les utilisateurs (route réservée à l'admin)
const getAllUsers = async (req, res) => {
    try {
        const [users] = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Erreur lors de la récupération des utilisateurs", error });
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

export { getAllUsers, deleteUser, getUserById };