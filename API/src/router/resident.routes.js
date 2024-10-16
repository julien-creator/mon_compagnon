import { Router } from "express";
import { getResidents, getResidentById } from "../controllers/resident.js";


const router = Router();

router.get("/all", getResidents);
router.get("/:id", getResidentById);



export default router;