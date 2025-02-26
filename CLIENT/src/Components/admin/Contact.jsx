import { useState, useEffect } from "react";

function Contact() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const fetchContacts = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:9000/api/v1/contact/all", {
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                setContacts(data);
            } else {
                setError(`Erreur : ${data.message || "Impossible de récupérer les messages."}`);
            }
        } catch (error) {
            setError("Erreur lors de la récupération des messages. Veuillez vérifier le backend.");
        } finally {
            setLoading(false);
        }
    };


    const updateContactStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/contact/update/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
                credentials: "include",
            });
            const result = await response.json();
            if (response.ok) {
                alert("Statut mis à jour avec succès !");
                fetchContacts();
            } else {
                alert(`Erreur : ${result.msg}`);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut :", error);
        }
    };


    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/contact/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                alert("Message supprimé avec succès !");
                fetchContacts();
            } else {
                const result = await response.json();
                alert(`Erreur : ${result.msg}`);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <h1>Gestion des Messages de Contact</h1>
            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.firstname}</td>
                                <td>{contact.lastname}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td>{contact.status}</td>
                                <td>
                                    {contact.status !== "message lu" && (
                                        <button
                                            onClick={() => updateContactStatus(contact.id, 1)}
                                        >
                                            Marquer comme lu
                                        </button>
                                    )}
                                    {contact.status !== "message non lu" && (
                                        <button
                                            onClick={() => updateContactStatus(contact.id, 0)}
                                        >
                                            Marquer comme non lu
                                        </button>
                                    )}
                                    <button onClick={() => deleteContact(contact.id)}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Contact;
