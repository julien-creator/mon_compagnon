import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/Slices/user";
import { toggleMenu } from "../../../store/Slices/menu";

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onClickLogout() {
        async function fetchLogout() {
            const response = await fetch("http://localhost:9000/api/v1/authentication/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 200) {
                const data = await response.json();
                dispatch(logout(data.isLogged));
                dispatch(toggleMenu());
                navigate("/");
            }
        }
        fetchLogout();
    }

    return (
        <header className="admin-header">
            <h1>Tableau de bord</h1>
            <nav>
                <Link to="/contact">Demandes de contact</Link>
                <Link to="/user">Gestion des utilisateurs</Link>
                <Link to="/resident">Gestion des résidents</Link>
                <Link to="/adoption">Gestion des adoptions</Link>
            </nav>
            <button onClick={onClickLogout}>
                <FontAwesomeIcon icon={faPowerOff} />
            </button>
        </header>
    );
}

export default Header;