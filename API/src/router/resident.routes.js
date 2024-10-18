import { Router } from "express";
import { getResidents, getResidentById, create, update, remove } from "../controllers/resident.js";
import { createDetail, updateDetail } from "../controllers/residentDetail.js";

const router = Router();

router.get("/all", getResidents); // sans middleware
router.get("/:id", getResidentById);  // sans middleware
router.post("/create", create); // ! Admin (middleware)
router.patch("/update/:id", update); // ! Admin (middleware)
router.delete("/delete/:id", remove); // ! Admin (middleware)
router.post("/:id/detail", createDetail); // ! Admin (middleware)
router.patch("/:id/detail", updateDetail); // ! Admin (middleware)

export default router;