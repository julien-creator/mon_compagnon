import Contact from "../models/Contact.js";

const submitContactForm = async (req, res) => {
    const { firstname, lastname, email, message } = req.body;
    try {
        const contact = await Contact.create(firstname, lastname, email, message);
        res.status(201).json({ msg: "Message reçu !", contact });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi du message" });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des messages" });
    }
};

const getById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ msg: "Contact non trouvé" });
            return;
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du contact", error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const contact = await Contact.update(req.body.status, req.params.id);
        if (!contact) {
            res.status(404).json({ msg: "status not updated !" });
            return;
        }
        res.json({ msg: "Status updated", contact });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const [response] = await Contact.remove(req.params.id);
        if (!response.affectedRows) {
            res.status(404).json({ msg: "Contact not deleted" });
            return;
        }
        res.json({ msg: "Contact deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

export { submitContactForm, getAllContacts, getById, update, remove };