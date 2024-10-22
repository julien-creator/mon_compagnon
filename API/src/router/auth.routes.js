import { Router } from "express";

import { create, login, logout, check_auth } from "../controllers/auth.js";


const router = Router();

router.post("/register", create);
router.post("/login", login); // Auth (middleware)

router.post("/logout", logout); // Auth (middleware)

// route pour vérifier si l'user est connecté
router.get("/check-auth", check_auth);

export default router;