import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormattedDate from "../FormattedDate";

function Resident() {
    const [residents, setResidents] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const fetchResidents = async () => {
        setLoading(true);
        setError("");
        setMsg("");
        try {
            const response = await fetch("http://localhost:9000/api/v1/resident/all");
            if (!response.ok) throw new Error("Erreur lors de la récupération des résidents");
            const data = await response.json();
            setResidents(data);
        } catch (err) {
            setError("Impossible de récupérer les résidents.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce résident ?")) return;
        try {
            const response = await fetch(`http://localhost:9000/api/v1/resident/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.msg || "Erreur lors de la suppression");
            }
            setResidents((prev) => prev.filter((resident) => resident.id !== id));
            setMsg("Résident supprimé avec succès !");
        } catch (err) {
            setError("Erreur lors de la suppression du résident.");
        }
    };

    useEffect(() => {
        fetchResidents();
    }, []);

    return (
        <section>
            <h2>Gestion des Résidents</h2>
            {msg && <p style={{ color: "green" }}>{msg}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <Link to="/resident/create">
                <button>Créer un Nouveau Résident</button>
            </Link>
            {loading ? (
                <p>Chargement...</p>
            ) : residents.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Âge</th>
                            <th>Sexe</th>
                            <th>Espèce</th>
                            <th>Race</th>
                            <th>Statut</th>
                            <th>Date d'arrivée</th>
                            <th>Photo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident) => (
                            <tr key={resident.id}>
                                <td>{resident.id}</td>
                                <td>{resident.name}</td>
                                <td>{resident.age}</td>
                                <td>{resident.sex}</td>
                                <td>{resident.specie}</td>
                                <td>{resident.breed_name}</td>
                                <td>{resident.status_name}</td>
                                <td>
                                    <FormattedDate dateStr={resident.arrival_date} />
                                </td>
                                <td>
                                    {resident.photo ? (
                                        <img
                                            src={`http://localhost:9000${resident.photo}`}
                                            alt={resident.name}
                                            width="100"
                                        />
                                    ) : (
                                        "Aucune image"
                                    )}
                                </td>
                                <td>
                                    <Link to={`/resident/${resident.id}`}>Voir les détails</Link>

                                    <button onClick={() => handleDelete(resident.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun résident trouvé.</p>
            )}
        </section>
    );
}

export default Resident;
