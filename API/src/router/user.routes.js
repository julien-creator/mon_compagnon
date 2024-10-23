import { Router } from "express";
import { getAllUsers, getUserById, removeUser } from "../controllers/user.js"

const router = Router();

router.get("/list", getAllUsers); // ! Admin (middleware)
router.get("/:id", getUserById);  // ! Admin (middleware)

router.delete("/delete/:id", removeUser); // ! Admin (middleware)

export default router;