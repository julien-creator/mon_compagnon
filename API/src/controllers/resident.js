import Resident from "../models/Resident.js";
import Upload from "./upload.js";

// Récupérer tous les résidents (triés par date d'arrivée)
const getResidents = async (req, res) => {
    try {
        const residents = await Resident.findResidents();

        // Retourne les résidents récupérés
        res.status(200).json(residents);
    } catch (error) {
        console.error("Erreur dans le contrôleur:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des résidents." });
    }
};

// Récupérer les détails d'un résident par ID
const getResidentById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const resident = await Resident.findById(id);

        if (!resident) {
            return res.status(404).json({ message: "Résident non trouvé." });
        }

        res.status(200).json(resident);
    } catch (error) {
        console.error("Erreur lors de la récupération du résident:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du résident." });
    }
};

const create = async (req, res) => {
    try {
        // Extraire les données du corps de la requête
        const { name, age, sex, specie, breed_id, status_id } = req.body;

        // Gérer l'image et obtenir le chemin
        const imagePath = await Upload.handleImageUpload(req);

        // Construire l'objet datas avec les champs appropriés
        const residentData = {
            name,
            age,
            sex,
            photo: imagePath,  // Chemin de l'image après upload
            specie,
            breed_id,
            status_id
        };

        // Créer le résident dans la base de données en passant l'objet residentData
        const [response] = await Resident.create(residentData);

        // Retourner une réponse de succès avec l'ID du résident créé
        return res.status(201).json({ msg: "Resident créé avec succès", id: response.insertId });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const update = async (req, res) => {
    try {
        const residentData = req.body;  // Assure-toi que le body contient toutes les colonnes nécessaires
        const [response] = await Resident.update(residentData, req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Resident not updated" });
            return;
        }
        res.json({ msg: "Resident updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await Resident.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Resident not deleted" });
            return;
        }
        res.json({ msg: "Resident deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { getResidents, getResidentById, create, update, remove };