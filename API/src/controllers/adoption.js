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

const createAdoption = async (req, res) => {
    try {
        const adoptionData = req.body; // Assure-toi que les données viennent du corps de la requête
        const result = await Adoption.create(adoptionData);
        res.status(201).json({ message: 'Adoption créée avec succès', adoptionId: result[0].insertId });
    } catch (error) {
        console.error("Erreur lors de la création de l'adoption:", error);
        res.status(500).json({ message: "Erreur lors de la création de l'adoption." });
    }
};

export { getAdoptions, createAdoption };