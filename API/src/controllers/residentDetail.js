import ResidentDetail from "../models/ResidentDetail.js";

const createDetail = async (req, res) => {
    try {
        const residentDetailData = req.body;
        const residentId = req.params.id;

        // Vérifier si le détail du résident existe déjà
        const existingDetail = await ResidentDetail.findDetailByResidentId(residentId);
        if (existingDetail) {
            return res.status(400).json({ msg: "Resident detail already exists" });
        }

        // Créer le détail du résident s'il n'existe pas encore
        await ResidentDetail.createDetail(residentId, residentDetailData);
        res.json({ msg: "Resident details added" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateDetail = async (req, res) => {
    try {
        const residentId = req.params.id;
        const newDetailData = req.body;

        // Récupérer les informations actuelles du résident
        const existingDetail = await ResidentDetail.findDetailByResidentId(residentId);

        if (!existingDetail) {
            return res.status(404).json({ msg: "Resident detail not found" });
        }

        // Fusionner les nouvelles données avec les anciennes
        const updatedDetail = {
            arrival_date: newDetailData.arrival_date || existingDetail.arrival_date,
            description: newDetailData.description || existingDetail.description,
            provenance: newDetailData.provenance || existingDetail.provenance,
            sterilized: newDetailData.sterilized !== undefined ? newDetailData.sterilized : existingDetail.sterilized,
            categorized: newDetailData.categorized !== undefined ? newDetailData.categorized : existingDetail.categorized,
            vaccine: newDetailData.vaccine !== undefined ? newDetailData.vaccine : existingDetail.vaccine,
        };

        // Mettre à jour les détails du résident
        const [response] = await ResidentDetail.updateDetail(updatedDetail, residentId);

        if (!response.affectedRows) {
            return res.status(404).json({ msg: "Resident detail not updated" });
        }

        res.json({ msg: "Resident detail updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { createDetail, updateDetail };