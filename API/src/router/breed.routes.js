import { Router } from "express";
import { getAllBreeds } from "../controllers/breed.js";

const router = Router();
router.get("/all", getAllBreeds); // Route publique pour récupérer toutes les races

export default router;