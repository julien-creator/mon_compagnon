import { useState, useEffect } from "react";

function CreateResidentForm() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        sex: "",
        specie: "",
        breed_id: "",
        status_id: "",
        photo: null,
    });

    const [detailData, setDetailData] = useState({
        arrival_date: "",
        description: "",
        provenance: "",
        sterilized: null,
        categorized: null,
        vaccine: "no",
    });

    const [breeds, setBreeds] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const fetchBreeds = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:9000/api/v1/breed/all");
            if (!response.ok)
                throw new Error("Erreur lors de la récupération des races.");
            const data = await response.json();
            setBreeds(data);
        } catch (err) {
            setError("Impossible de récupérer les races.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBreeds();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
    };


    const handleDetailChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDetailData({
            ...detailData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => form.append(key, value));

        try {
            // Création du résident
            const response = await fetch("http://localhost:9000/api/v1/resident/create", {
                method: "POST",
                body: form,
                credentials: "include",
            });

            if (!response.ok) throw new Error("Erreur lors de la création du résident.");

            const resident = await response.json();


            const detailResponse = await fetch(
                `http://localhost:9000/api/v1/resident/detail/${resident.id}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(detailData),
                }
            );

            if (!detailResponse.ok)
                throw new Error("Erreur lors de l'ajout des détails du résident.");

            console.log("Détails envoyés :", detailData);
            console.log("Formulaire résident :", formData);
            alert("Résident et détails créés avec succès !");
        } catch (err) {
            setError("Une erreur est survenue lors de la création.");

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <h3>Informations sur le Résident</h3>
            <label>
                Nom :
                <input type="text" name="name" onChange={handleChange} required />
            </label>
            <label>
                Âge :
                <input type="number" name="age" onChange={handleChange} required />
            </label>
            <label>
                Sexe :
                <select name="sex" onChange={handleChange} required>
                    <option value="">Sélectionner le sexe</option>
                    <option value="female">Femelle</option>
                    <option value="male">Mâle</option>
                </select>
            </label>
            <label>
                Espèce :
                <select name="specie" onChange={handleChange} required>
                    <option value="">Sélectionner l'espèce</option>
                    <option value="chien">Chien</option>
                    <option value="chat">Chat</option>
                    <option value="NAC">NAC</option>
                    <option value="autre">Autre</option>
                </select>
            </label>
            <label>
                Race :
                <select name="breed_id" onChange={handleChange} required>
                    <option value="">Sélectionner une race</option>
                    {breeds.map((breed) => (
                        <option key={breed.id} value={breed.id}>
                            {breed.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Statut :
                <select name="status_id" onChange={handleChange} required>
                    <option value="">Sélectionner un statut</option>
                    <option value="1">Disponible à l'adoption</option>
                    <option value="2">En cours d'adoption</option>
                    <option value="3">Adopté</option>
                    <option value="4">Recherche sa famille</option>
                    <option value="5">Décédé</option>
                    <option value="6">En attente de validation</option>
                </select>
            </label>
            <label>
                Photo :
                <input type="file" name="photo" onChange={handleFileChange} required />
            </label>

            <h3>Détails du Résident</h3>
            <label>
                Date d'arrivée :
                <input type="date" name="arrival_date" onChange={handleDetailChange} />
            </label>
            <textarea
                name="description"
                placeholder="Description"
                onChange={handleDetailChange}
            ></textarea>
            <input type="text" name="provenance" placeholder="Provenance" onChange={handleDetailChange} />
            <label>
                Stérilisé :
                <input type="date" name="sterilized" onChange={handleDetailChange} />
            </label>
            <label>
                Catégorisé :
                <select name="categorized" onChange={handleDetailChange}>
                    <option value="">Non catégorisé</option>
                    <option value="1">Catégorie 1</option>
                    <option value="2">Catégorie 2</option>
                </select>
            </label>
            <label>
                Vacciné :
                <select name="vaccine" onChange={handleDetailChange}>

                    <option value="no">Non</option>
                    <option value="yes">Oui</option>
                </select>
            </label>

            <button type="submit" disabled={loading}>Créer</button>
        </form>
    );
}

export default CreateResidentForm;