import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMsg } from "../../store/Slices/user";

function Adoption() {
    const [adoptions, setAdoptions] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.user.msg);

    useEffect(() => {
        const fetchAdoptions = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/v1/adoption/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données");
                }

                const data = await response.json();
                setAdoptions(data);
            } catch (err) {
                setError("Erreur lors de la récupération des données");
            }
        };

        fetchAdoptions();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/adoption/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                setAdoptions((prev) =>
                    prev.map((adoption) =>
                        adoption.adoption_id === id ? { ...adoption, status } : adoption
                    )
                );
                dispatch(setMsg("Statut mis à jour avec succès"));
            } else {
                const result = await response.json();
                dispatch(setMsg(result.msg || "Erreur lors de la mise à jour du statut"));
            }
        } catch (error) {
            dispatch(setMsg("Erreur lors de la mise à jour du statut"));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette adoption ?")) return;

        try {
            const response = await fetch(`http://localhost:9000/api/v1/adoption/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.ok) {
                setAdoptions((prev) => prev.filter((adoption) => adoption.adoption_id !== id));
                dispatch(setMsg("Adoption supprimée avec succès"));
            } else {
                const result = await response.json();
                dispatch(setMsg(result.msg || "Erreur lors de la suppression de l'adoption"));
            }
        } catch (error) {
            dispatch(setMsg("Erreur lors de la suppression de l'adoption"));
        }
    };

    if (!adoptions) return error ? <p className="error">{error}</p> : <p>Chargement des données...</p>;

    return (
        <section>
            <h2>Gestion des Adoptions</h2>
            {msg && <p className="message">{msg}</p>}
            {adoptions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Résident</th>
                            <th>Utilisateur</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adoptions.map((adoption) => (
                            <tr key={adoption.adoption_id}>
                                <td>{adoption.adoption_id}</td>
                                <td>{adoption.resident_name}</td>
                                <td>{adoption.lastname}</td>
                                <td>{adoption.email}</td>
                                <td>{adoption.phone}</td>
                                <td>{new Date(adoption.receipt_date).toLocaleDateString()}</td>
                                <td>
                                    <select
                                        value={adoption.status}
                                        onChange={(e) => handleStatusUpdate(adoption.adoption_id, e.target.value)}
                                    >
                                        <option value="demande non traitée">Non traitée</option>
                                        <option value="demande traitée">Traitée</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(adoption.adoption_id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune adoption trouvée.</p>
            )}
        </section>
    );
}

export default Adoption;
