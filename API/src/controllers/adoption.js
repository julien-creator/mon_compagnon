import Adoption from "../models/Adoption.js";


const getAdoptions = async (req, res) => {
    try {
        const adoptions = await Adoption.findAdoption();

        // Retourne les résidents récupérés
        res.status(200).json(adoptions);
    } catch (error) {
        console.error("Erreur dans le contrôleur:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des demandes d'adoptions." });
    }
};

export const getAdoptionById = async (req, res) => {
    const { id } = req.params;

    try {
        const adoption = await Adoption.findById(id);
        if (adoption) {
            return res.status(200).json(adoption);
        } else {
            return res.status(404).json({ message: "Adoption non trouvée" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const createAdoption = async (req, res) => {
    const { message, time_slot, user_id, resident_id } = req.body;

    try {
        // Appel de la méthode create dans le modèle
        const newAdoption = await Adoption.create(message, time_slot, user_id, resident_id);
        return res.status(201).json(newAdoption); // Réponse en cas de succès
    } catch (error) {
        return res.status(400).json({ error: error.message }); // Réponse en cas d'erreur
    }
};

export const updateAdoptionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedAdoption = await Adoption.updateStatus(id, status);
        return res.status(200).json(updatedAdoption);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteAdoption = async (req, res) => {
    const { id } = req.params;

    try {
        await Adoption.remove(id);
        return res.status(204).json({ message: "Demande supprimée" }); // 204 No Content en cas de suppression réussie
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { getAdoptions, createAdoption };