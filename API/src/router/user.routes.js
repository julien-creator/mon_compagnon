import { Router } from "express";
import { getAllUsers, deleteUser, updateUser, getUserById } from "../controllers/user.js"

const router = Router();

router.get("/list", getAllUsers); // ! Admin (middleware)
router.get("/:id", getUserById);  // ! Admin (middleware)
router.patch("/update/:id", updateUser); // ! Admin (middleware)
router.delete("/delete/:id", deleteUser); // ! Admin (middleware)

export default router;