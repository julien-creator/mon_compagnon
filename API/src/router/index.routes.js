import { Router } from "express";
import contact_routes from "./contact.routes.js";
import user_routes from "./user.routes.js"

const router = Router();

// Exemple de route
router.get("/", (req, res) => {
    res.json({ msg: "Bienvenue sur l'API!" });
});

router.use("/contact", contact_routes);
router.use("/user", user_routes)

// Route pour gérer les erreurs 404
router.get("*", (req, res) => {
    res.status(404).json({ msg: "Aie caramba ! C'est not found là !" });
});

export default router;

