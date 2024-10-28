import { Router } from "express";
import { getAllUsers, getUserById, removeUser } from "../controllers/user.js"
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = Router();

router.get("/list", withAdminAuth, getAllUsers); // ! Admin (middleware)
router.get("/:id", withAdminAuth, getUserById);  // ! Admin (middleware)

router.delete("/delete/:id", withAdminAuth, removeUser); // ! Admin (middleware)

export default router;