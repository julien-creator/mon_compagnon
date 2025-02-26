import Breed from "../models/Breed.js";

const getAllBreeds = async (req, res) => {
    try {
        const [response] = await Breed.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: "Erreur lors de la récupération des races." });
    }
};
export { getAllBreeds };