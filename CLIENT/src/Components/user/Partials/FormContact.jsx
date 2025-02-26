import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMsg } from "../../../store/Slices/user";
import useCloseMenu from "../../../Hooks/useCloseMenu";

const FormContact = () => {
    useCloseMenu();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const msg = useSelector((state) => state.user.msg);

    const handleContact = async (e) => {
        e.preventDefault();

        // Validation des champs
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !message.trim()) {
            dispatch(setMsg("Tous les champs sont obligatoires."));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            dispatch(setMsg("Veuillez fournir une adresse email valide."));
            return;
        }

        if (message.length < 10) {
            dispatch(setMsg("Le message doit contenir au moins 10 caractères."));
            return;
        }

        setLoading(true);
        dispatch(setMsg(""));

        try {
            const response = await fetch("http://localhost:9000/api/v1/contact/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, email, message }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setMsg("Message envoyé avec succès ! Merci de nous avoir contactés."));
                setFirstname("");
                setLastname("");
                setEmail("");
                setMessage("");
            } else if (response.status === 400) {
                const errorData = await response.json();
                dispatch(setMsg(errorData.msg || "Erreur dans les données envoyées."));
            } else if (response.status === 500) {
                dispatch(setMsg("Erreur interne du serveur. Veuillez réessayer plus tard."));
            }
        } catch (error) {
            console.log(error);
            dispatch(setMsg("Erreur lors de l'envoi du message. Veuillez réessayer."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-form">
            <h2>Nous Contacter</h2>
            <form onSubmit={handleContact}>
                <label>Prénom</label>
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <label>Nom</label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                {msg && <p>{msg}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer"}
                </button>
            </form>
        </section>
    );
};

export default FormContact;