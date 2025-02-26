import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faBars,
    faTimes,
    faRightFromBracket,
    faRightToBracket,
    faUser,
    faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, NavLink } from "react-router-dom";

import { toggleMenu } from "../../../store/Slices/menu";
import { logout } from "../../../store/Slices/user";

function Nav() {
    const user = useSelector((state) => state.user); // État utilisateur dans Redux
    const menu = useSelector((state) => state.menu); // État du menu dans Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Gestion de la détection de l'écran
    const [type, setType] = useState(
        window.innerWidth > 600 ? "tabletAndMore" : "mobile"
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 600) {
                setType("tabletAndMore");
            } else {
                setType("mobile");
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Fonction de déconnexion
    const onClickLogout = () => {
        async function fetchLogout() {
            try {
                const response = await fetch("http://localhost:9000/api/v1/authentication/logout", {
                    method: "POST",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(logout(data.isLogged)); // Met à jour Redux pour `user`
                    dispatch(toggleMenu()); // Ferme le menu (si ouvert)
                    navigate("/"); // Redirige vers la page d'accueil
                } else {
                    console.error("Erreur lors de la déconnexion");
                }
            } catch (error) {
                console.error("Erreur de réseau : ", error);
            }
        }

        fetchLogout();
    };

    return (
        <>
            {type === "mobile" && (
                <button
                    onClick={() => dispatch(toggleMenu())}
                    className="burger-button"
                >
                    <FontAwesomeIcon icon={menu.isOpen ? faTimes : faBars} />
                </button>
            )}

            <nav
                className={`nav ${type === "mobile" && menu.isOpen ? "burger open" : "screen"}`}
            >
                <NavLink to={"/"} onClick={() => type === "mobile" && dispatch(toggleMenu())}>
                    <FontAwesomeIcon icon={faHome} /> Accueil
                </NavLink>

                <NavLink
                    to={"/resident"}
                    onClick={() => type === "mobile" && dispatch(toggleMenu())}
                >
                    <FontAwesomeIcon icon={faPaw} /> Nos Résidents
                </NavLink>

                {user.isLogged ? (
                    <>
                        <NavLink
                            to={"/dashboard"}
                            onClick={() => type === "mobile" && dispatch(toggleMenu())}
                        >
                            <FontAwesomeIcon icon={faUser} /> Profil
                        </NavLink>
                        <button onClick={onClickLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} /> Déconnexion
                        </button>
                    </>
                ) : (
                    <NavLink
                        to={"/login"}
                        onClick={() => type === "mobile" && dispatch(toggleMenu())}
                    >
                        <FontAwesomeIcon icon={faRightToBracket} /> Se connecter
                    </NavLink>

                )}
            </nav>
        </>
    );
}

export default Nav;