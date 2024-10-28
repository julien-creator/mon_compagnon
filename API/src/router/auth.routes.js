import { Router } from "express";

import { createAccount, login, logout, check_auth } from "../controllers/auth.js";
import withAuth from "../middlewares/withAuth.js";


const router = Router();

router.post("/register", createAccount);
router.post("/login", login);

router.post("/logout", withAuth, logout); // Auth (middleware)

// route pour vérifier si l'user est connecté
router.get("/check-auth", withAuth, check_auth);

export default router;