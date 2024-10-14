import { Router } from "express";
import { submitContactForm, getAllContacts, getById, update, remove } from "../controllers/contact.js";

const router = Router();


router.post("/create", submitContactForm); //pour visiteur/user

router.get("/all", getAllContacts); // ! Admin (middleware)

router.get("/:id", getById); // ! Admin (middleware)

router.patch("/update/:id", update); // ! Admin (middleware)

router.delete("/delete/:id", remove); // ! Admin (middleware)

export default router;