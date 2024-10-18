import ResidentDetail from "../models/ResidentDetail.js";

const createDetail = async (req, res) => {
    try {
        const residentDetailData = req.body;
        const residentId = req.params.id;
        await ResidentDetail.createDetail(residentId, residentDetailData);
        res.json({ msg: "Resident details added" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const updateDetail = async (req, res) => {
    try {
        const residentDetailData = req.body;
        const residentId = req.params.id;
        const [response] = await ResidentDetail.updateDetail(residentDetailData, residentId);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Resident detail not updated" });
            return;
        }
        res.json({ msg: "Resident detail updated" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { createDetail, updateDetail }