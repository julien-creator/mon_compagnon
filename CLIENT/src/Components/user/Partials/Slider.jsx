import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Slider = ({ residents }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const itemsPerPage = 1;
    const maxIndex = Math.ceil(residents.length / itemsPerPage) - 1;


    const nextPage = () => {
        setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
    };


    const prevPage = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
    };

    const currentResidents = residents.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    );

    if (!residents.length) {
        return <p>Aucun résident disponible</p>;
    }


    return (
        <div className="slider-container">
            <button className="prev-btn" onClick={prevPage}>
                <FontAwesomeIcon icon={faCircleArrowLeft} />
            </button>
            <div className="slider">
                {currentResidents.map((resident) => (
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
            <button className="next-btn" onClick={nextPage}>
                <FontAwesomeIcon icon={faCircleArrowRight} />
            </button>
        </div>
    );
};

export default Slider;