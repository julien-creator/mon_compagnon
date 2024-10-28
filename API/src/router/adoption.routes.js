import { Router } from "express";
import { createAdoption, deleteAdoption, getAdoptionById, getAdoptions, updateAdoptionStatus } from "../controllers/adoption.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";
import withAuth from "../middlewares/withAuth.js";

const router = Router();

router.get("/all", withAdminAuth, getAdoptions); // ! Admin (middleware)
router.get("/:id", withAdminAuth, getAdoptionById);  // ! Admin (middleware)
router.post("/create/:id", withAuth, createAdoption); // Auth (middleware)
router.patch("/update/:id", withAdminAuth, updateAdoptionStatus); // ! Admin (middleware)
router.delete("/delete/:id", withAdminAuth, deleteAdoption); // ! Admin (middleware)

export default router;