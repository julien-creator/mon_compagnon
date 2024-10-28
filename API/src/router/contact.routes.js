import { Router } from "express";
import { createContact, getAllContacts, getById, updateContactStatus, removeContact } from "../controllers/contact.js";
import withAdminAuth from "../middlewares/withAdminAuth.js";

const router = Router();


router.post("/create", createContact); //pour visiteur/user

router.get("/all", withAdminAuth, getAllContacts); // ! Admin (middleware)

router.get("/:id", withAdminAuth, getById); // ! Admin (middleware)

router.patch("/update/:id", withAdminAuth, updateContactStatus); // ! Admin (middleware)

router.delete("/delete/:id", withAdminAuth, removeContact); // ! Admin (middleware)

export default router;