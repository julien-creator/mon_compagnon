import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Resident() {

    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch("http://localhost:9000/api/v1/resident/all");
            const data = await response.json();
            setResidents(data);
        };

        fetchResidents();
    }, []);

    return (
        <>

            <div className="card">
                {residents.map((resident) => (
                    <div key={resident.id} className="slider-item">
                        <h3>{resident.name}</h3>
                        <img src={`http://localhost:9000${resident.photo}`} alt={resident.name} />
                        <p>Sexe : {resident.sex}</p>
                        <p>Âge : {resident.age}</p>
                        <p>Race : {resident.breed_name}</p>
                        <p>Statut : {resident.status_name}</p>
                        <p>Description : {resident.description || "Pas de description disponible..."}</p>
                        <Link to={`/resident/${resident.id}`}>Voir le détail</Link>
                    </div>
                ))}
            </div>

        </>

    );
}

export default Resident