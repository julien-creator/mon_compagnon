import Resident from "../model/Resident.js";

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

export { getResidents, getResidentById };