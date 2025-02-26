import { useEffect, useState } from "react";
import useCloseMenu from "../../Hooks/useCloseMenu";
import Slider from "../user/Partials/Slider"; // Importer le slider
import FormContact from "../user/Partials/FormContact";
import About from "./Partials/About";

const Home = () => {
    useCloseMenu();

    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const fetchResidents = async () => {
            const response = await fetch("http://localhost:9000/api/v1/resident/all");
            const data = await response.json();
            setResidents(data.slice(0, 5)); // Récupérer les 5 derniers résidents
        };

        fetchResidents();
    }, []);

    return (
        <main>
            <section className="residents-slider">
                <h2>Les 5 derniers résidents</h2>
                <Slider residents={residents} />
            </section>
            <section>
                <About />
            </section>
            <section>
                <FormContact />
            </section>
        </main>
    );
};

export default Home;