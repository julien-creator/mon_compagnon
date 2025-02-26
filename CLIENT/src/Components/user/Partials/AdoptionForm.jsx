import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AdoptionForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({ message: "", time_slot: "" });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.message || !formData.time_slot) {
            setError("Tous les champs doivent être remplis.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:9000/api/v1/adoption/create/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: formData.message,
                    time_slot: formData.time_slot,
                }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.msg);
                setFormData({ message: "", time_slot: "" });
                setError("");
            } else {
                const errorData = await response.json();
                setError(errorData.msg || "Une erreur est survenue.");
            }
        } catch {
            setError("Impossible de soumettre la demande pour le moment.");
        }
    };

    return (
        <div>
            <h2>Demande d'adoption</h2>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="message">Message :</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time_slot">Créneau souhaité :</label>
                    <input
                        id="time_slot"
                        name="time_slot"
                        type="text"
                        value={formData.time_slot}
                        onChange={handleChange}
                        placeholder="Exemple : Lundi matin"
                        required
                    />
                </div>
                <button type="submit" disabled={!formData.message || !formData.time_slot}>
                    Envoyer la demande
                </button>
            </form>
        </div>
    );
};

export default AdoptionForm;