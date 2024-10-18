import { Router } from "express";
import { createAdoption, getAdoptions } from "../controllers/adoption.js";


const router = Router();

router.get("/all", getAdoptions); // ! Admin (middleware)
//router.get("/:id", getAdoptionById);  // ! Admin (middleware)
router.post("/create", createAdoption); // Auth (middleware)
//router.patch("/update/:id", update); // ! Admin (middleware)
//router.delete("/delete/:id", remove); // ! Admin (middleware)

export default router;