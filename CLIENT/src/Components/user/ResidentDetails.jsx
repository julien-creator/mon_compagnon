import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useCloseMenu from "../../Hooks/useCloseMenu";
import FormattedDate from "../FormattedDate";
import AdoptionForm from "./Partials/AdoptionForm";

const ResidentDetails = () => {
    useCloseMenu();

    const { id } = useParams();
    const [resident, setResident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adoptionMessage, setAdoptionMessage] = useState(""); // Message si utilisateur non connecté
    const [showAdoptionForm, setShowAdoptionForm] = useState(false);

    const { isLogged } = useSelector((state) => state.user); // Vérifier si l'utilisateur est connecté

    useEffect(() => {
        const fetchResident = async () => {
            try {
                const response = await fetch(`http://localhost:9000/api/v1/resident/${id}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données.");
                }
                const data = await response.json();
                setResident(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResident();
    }, [id]);

    const handleAdoptionClick = () => {
        if (!isLogged) {
            setAdoptionMessage("Vous devez être connecté pour adopter ce résident.");
        } else {
            setAdoptionMessage("");

            setShowAdoptionForm(true);
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (error) {
        return <div className="error">Erreur : {error}</div>;
    }

    return (
        <main>
            <h1>{resident.name}</h1>
            <div className="resident-details">
                <img src={`http://localhost:9000${resident.photo}`} alt={resident.name} />
                <p>Âge : {resident.age}</p>
                <p>Sexe : {resident.sex}</p>
                <p>Espèce : {resident.specie}</p>
                <p>Race : {resident.breed_name}</p>
                <p>Statut : {resident.status_name}</p>
                <p>Description : {resident.description}</p>
                <p>Date d'arrivée : <FormattedDate dateStr={resident.arrival_date} /></p>
                <p>Provenance : {resident.provenance}</p>
                <p>
                    Stérilisé : {resident.sterilized ? (
                        <FormattedDate dateStr={resident.sterilized} />
                    ) : (
                        "Non"
                    )}
                </p>
                <p>
                    Catégorisé :{" "}
                    {resident.categorized ? `Catégorie ${resident.categorized}` : "Non catégorisé"}
                </p>
                <p>Vacciné : {resident.vaccine ? "Oui" : "Non"}</p>


                {!showAdoptionForm && (
                    <button onClick={handleAdoptionClick}>Adopter ce résident</button>
                )}
                {adoptionMessage && <p style={{ color: "red" }}>{adoptionMessage}</p>}
                {showAdoptionForm && <AdoptionForm />}
            </div>
        </main>
    );
};

export default ResidentDetails;