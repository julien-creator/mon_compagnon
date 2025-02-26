import { Router } from "express";
import contact_routes from "./contact.routes.js";
import user_routes from "./user.routes.js";
import resident_routes from "./resident.routes.js";
import adoption_routes from "./adoption.routes.js";
import auth_routes from "./auth.routes.js";
import breed_routes from "./breed.routes.js"
const router = Router();

// Exemple de route
router.get("/", (req, res) => {
    res.json({ msg: "Bienvenue sur l'API!" });
});

router.use("/contact", contact_routes);
router.use("/user", user_routes);
router.use("/resident", resident_routes);
router.use("/breed", breed_routes)
router.use("/adoption", adoption_routes);
router.use("/authentication", auth_routes);

// Route pour gérer les erreurs 404
router.get("*", (req, res) => {
    res.status(404).json({ msg: "Aie caramba ! C'est not found là !" });
});

export default router;

