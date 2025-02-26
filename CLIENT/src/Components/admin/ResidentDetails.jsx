import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormattedDate from "../FormattedDate";
import useCloseMenu from "../../Hooks/useCloseMenu";

function ResidentDetails() {
    useCloseMenu();

    const { id } = useParams();
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pour le mode édition
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);
    const [updateError, setUpdateError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchResident = async () => {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/resident/${id}`);
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des données.");
            }
            const data = await response.json();
            setResident(data);
            setFormData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResident();
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setUpdateError("");
        setSuccessMessage("");
        if (!isEditing) {
            setFormData(resident);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateForm = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            updateForm.append(key, value);
        });
        try {
            const response = await fetch(`http://localhost:9000/api/v1/resident/update/${id}`, {
                method: "PATCH",
                body: updateForm,
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du résident.");
            }
            await response.json();
            setSuccessMessage("Mise à jour réussie !");
            setIsEditing(false);
            fetchResident();
        } catch (err) {
            setUpdateError("Erreur lors de la mise à jour du résident.");
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    if (!resident) return null;

    return (
        <main>
            <h1>Détails du Résident : {resident.name}</h1>
            {!isEditing ? (
                <div className="resident-details">
                    <p>ID : {resident.id}</p>
                    <p>Nom : {resident.name}</p>
                    <p>Âge : {resident.age}</p>
                    <p>Sexe : {resident.sex}</p>
                    <p>Espèce : {resident.specie}</p>
                    <p>Race : {resident.breed_name}</p>
                    <p>Statut : {resident.status_name}</p>
                    <p>
                        Date d'arrivée : <FormattedDate dateStr={resident.arrival_date} />
                    </p>
                    <p>Description : {resident.description}</p>
                    <p>Provenance : {resident.provenance}</p>
                    <p>
                        Stérilisé :{" "}
                        {resident.sterilized ? <FormattedDate dateStr={resident.sterilized} /> : "Non"}
                    </p>
                    <p>
                        Catégorisé :{" "}
                        {resident.categorized ? `Catégorie ${resident.categorized}` : "Non catégorisé"}
                    </p>
                    <p>Vacciné : {resident.vaccine ? "Oui" : "Non"}</p>
                    <p>
                        Photo :{" "}
                        {resident.photo ? (
                            <img
                                src={`http://localhost:9000${resident.photo}`}
                                alt={resident.name}
                                width="100"
                            />
                        ) : (
                            "Aucune image"
                        )}
                    </p>
                    <button onClick={handleEditToggle}>Modifier les informations</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {updateError && <p>Erreur : {updateError}</p>}
                    {successMessage && <p>{successMessage}</p>}
                    <label>
                        Nom :
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Âge :
                        <input
                            type="number"
                            name="age"
                            value={formData.age || ""}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Sexe :
                        <select name="sex" value={formData.sex || ""} onChange={handleChange} required>
                            <option value="M">Mâle</option>
                            <option value="F">Femelle</option>
                        </select>
                    </label>
                    <label>
                        Espèce :
                        <select
                            name="specie"
                            value={formData.specie || ""}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionner l'espèce</option>
                            <option value="chien">Chien</option>
                            <option value="chat">Chat</option>
                            <option value="NAC">NAC</option>
                            <option value="autre">Autre</option>
                        </select>
                    </label>
                    <label>
                        Race :
                        <input
                            type="text"
                            name="breed_name"
                            value={formData.breed_name || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Statut :
                        <input
                            type="text"
                            name="status_name"
                            value={formData.status_name || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Date d'arrivée :
                        <input
                            type="date"
                            name="arrival_date"
                            value={formData.arrival_date || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Description :
                        <textarea
                            name="description"
                            value={formData.description || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Provenance :
                        <input
                            type="text"
                            name="provenance"
                            value={formData.provenance || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Stérilisé :
                        <input
                            type="date"
                            name="sterilized"
                            value={formData.sterilized || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Catégorisé :
                        <select
                            name="categorized"
                            value={formData.categorized || ""}
                            onChange={handleChange}
                        >
                            <option value="">Non catégorisé</option>
                            <option value="1">Catégorie 1</option>
                            <option value="2">Catégorie 2</option>
                        </select>
                    </label>
                    <label>
                        Vacciné :
                        <select name="vaccine" value={formData.vaccine || ""} onChange={handleChange}>
                            <option value="no">Non</option>
                            <option value="yes">Oui</option>
                        </select>
                    </label>
                    <label>
                        Photo :
                        <input type="file" name="photo" onChange={handleFileChange} />
                    </label>
                    <button type="submit">Enregistrer</button>
                    <button type="button" onClick={handleEditToggle}>Annuler</button>
                </form>
            )}
        </main>
    );
}

export default ResidentDetails;