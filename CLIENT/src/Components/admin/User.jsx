import { useState, useEffect } from "react";

function User() {
    const [users, setUsers] = useState([]); // Liste des utilisateurs
    const [selectedUser, setSelectedUser] = useState(null); // Détails d'un utilisateur sélectionné
    const [error, setError] = useState(""); // Gestion des erreurs
    const [loading, setLoading] = useState(false); // Indicateur de chargement

    // Fonction pour récupérer tous les utilisateurs
    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:9000/api/v1/user/list", {
                credentials: "include", // Inclure les cookies pour l'authentification
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data); // Mettre à jour la liste des utilisateurs
            } else {
                setError(`Erreur : ${data.msg || "Impossible de récupérer les utilisateurs."}`);
            }
        } catch (error) {
            setError("Erreur lors de la récupération des utilisateurs. Veuillez vérifier le backend.");
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour récupérer les détails d'un utilisateur
    const fetchUserById = async (id) => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`http://localhost:9000/api/v1/user/${id}`, {
                credentials: "include",
            });
            const data = await response.json();
            if (response.ok) {
                setSelectedUser(data); // Mettre à jour les détails de l'utilisateur
            } else {
                setError(`Erreur : ${data.msg || "Utilisateur non trouvé."}`);
            }
        } catch (error) {
            setError("Erreur lors de la récupération de l'utilisateur. Veuillez vérifier le backend.");
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                const response = await fetch(`http://localhost:9000/api/v1/user/delete/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });
                const data = await response.json();
                if (response.ok) {
                    alert(data.msg);
                    fetchUsers(); // Rafraîchir la liste après suppression
                } else {
                    setError(`Erreur : ${data.msg}`);
                }
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };

    // Charger la liste des utilisateurs au montage du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Gestion des Utilisateurs</h1>
            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Liste des utilisateurs */}
            {!loading && !error && !selectedUser && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => fetchUserById(user.id)}>Voir</button>
                                    <button onClick={() => deleteUser(user.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Détails d'un utilisateur */}
            {selectedUser && (
                <div>
                    <h2>Détails de l'utilisateur</h2>
                    <p>
                        <strong>ID : </strong> {selectedUser.id}
                    </p>
                    <p>
                        <strong>Prénom : </strong> {selectedUser.firstname}
                    </p>
                    <p>
                        <strong>Nom : </strong> {selectedUser.lastname}
                    </p>
                    <p>
                        <strong>Email : </strong> {selectedUser.email}
                    </p>
                    <p>
                        <strong>Téléphone : </strong> {selectedUser.phone}
                    </p>
                    <p>
                        <strong>Rôle : </strong> {selectedUser.role}
                    </p>
                    <button onClick={() => setSelectedUser(null)}>Retour à la liste</button>
                </div>
            )}
        </div>
    );
}

export default User;