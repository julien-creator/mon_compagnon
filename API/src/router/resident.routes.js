import { Router } from "express";
import { getResidents, getResidentById, create, update, remove } from "../controllers/resident.js";
import { createDetail, updateDetail } from "../controllers/residentDetail.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = Router();

router.get("/all", getResidents); // sans middleware
router.get("/:id", getResidentById);  // sans middleware
router.post("/create", withAdminAuth, create); // ! Admin (middleware)
router.patch("/update/:id", withAdminAuth, update); // ! Admin (middleware)
router.delete("/delete/:id", withAdminAuth, remove); // ! Admin (middleware)
router.post("/detail/:id", withAdminAuth, createDetail); // ! Admin (middleware)
router.patch("/detail/:id", withAdminAuth, updateDetail); // ! Admin (middleware)

export default router;