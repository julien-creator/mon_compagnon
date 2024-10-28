
import Adoption from "../models/Adoption.js";

const getAdoptions = async (req, res) => {
    try {
        const [adoptions] = await Adoption.findAll();
        res.status(200).json(adoptions);
    } catch (error) {
        console.error("Erreur dans le contrôleur:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des demandes d'adoptions." });
    }
};

const getAdoptionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [adoption] = await Adoption.findById(id);
        if (!adoption) {
            return res.status(404).json({ message: "Adoption non trouvée" });
        }
        res.status(200).json(adoption);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAdoption = async (req, res) => {
    try {
        //console.log(req.params)
        const { message, time_slot } = req.body;

        const datas = {
            message,
            time_slot,
            user_id: req.session.user.id,
            resident_id: parseInt(req.params.id)
        }
        console.log(datas);
        console.log(req.session.user.id);
        // Vérification des adoptions en cours
        const [userAdoption] = await Adoption.checkUserAdoption(datas.user_id);
        if (userAdoption.length > 0) {
            return res.status(400).json({ msg: "Cet utilisateur a déjà une adoption en cours." });
        }

        const [residentAdoption] = await Adoption.checkResidentAdoption(datas.resident_id);
        if (residentAdoption.length > 0) {
            return res.status(400).json({ msg: "Ce résident est déjà en cours d'adoption." });
        }

        const [result] = await Adoption.create(datas);
        res.status(201).json({
            msg: "Adoption créée avec succès",
            adoption_id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updateAdoptionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const [updatedAdoption] = await Adoption.updateStatus(id, status);
        if (!updatedAdoption.affectedRows) {
            return res.status(404).json({ msg: "Adoption non trouvée ou statut non mis à jour" });
        }
        res.status(200).json({ msg: "Statut mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAdoption = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await Adoption.remove(id);
        if (!result.affectedRows) {
            res.status(404).json({ message: "Adoption non trouvée" });
            return;
        }
        res.status(201).json({ msg: "Adoption supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAdoptions, getAdoptionById, createAdoption, updateAdoptionStatus, deleteAdoption };