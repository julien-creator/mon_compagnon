import { Router } from "express";
import { createContact, getAllContacts, getById, updateContactStatus, removeContact } from "../controllers/contact.js";

const router = Router();


router.post("/create", createContact); //pour visiteur/user

router.get("/all", getAllContacts); // ! Admin (middleware)

router.get("/:id", getById); // ! Admin (middleware)

router.patch("/update/:id", updateContactStatus); // ! Admin (middleware)

router.delete("/delete/:id", removeContact); // ! Admin (middleware)

export default router;