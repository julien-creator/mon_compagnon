import { Router } from "express";
import { createAdoption, deleteAdoption, getAdoptionById, getAdoptions, updateAdoptionStatus } from "../controllers/adoption.js";


const router = Router();

router.get("/all", getAdoptions); // ! Admin (middleware)
router.get("/:id", getAdoptionById);  // ! Admin (middleware)
router.post("/create", createAdoption); // Auth (middleware)
router.patch("/update/:id", updateAdoptionStatus); // ! Admin (middleware)
router.delete("/delete/:id", deleteAdoption); // ! Admin (middleware)

export default router;