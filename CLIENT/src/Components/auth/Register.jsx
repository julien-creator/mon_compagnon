import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginFailed, setMsg } from "../../store/Slices/user"; // Actions Redux
import useCloseMenu from "../../Hooks/useCloseMenu";
import DOMPurify from "dompurify"; // Pour sécuriser les entrées utilisateur

const Register = () => {
	useCloseMenu(); // Ferme le menu à l'ouverture de la page
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const msg = useSelector((state) => state.user.msg); // Message du store Redux

	// États locaux pour les champs du formulaire
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [formError, setFormError] = useState(null); // Gestion des erreurs de formulaire

	// Fonction de validation du formulaire
	const validateForm = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^[0-9+\-() ]{6,15}$/; // Accepte des chiffres, espaces, +, -, () pour un numéro entre 6 et 15 caractères

		if (firstname.trim() === "" || lastname.trim() === "") {
			setFormError("Les champs Prénom et Nom sont obligatoires.");
			return false;
		}

		if (!emailRegex.test(email)) {
			setFormError("Veuillez entrer une adresse e-mail valide.");
			return false;
		}

		if (password.length < 8) {
			setFormError("Le mot de passe doit comporter au moins 8 caractères.");
			return false;
		}

		if (!phoneRegex.test(phone)) {
			setFormError("Veuillez entrer un numéro de téléphone valide (6 à 15 caractères).");
			return false;
		}

		if (!birthdate) {
			setFormError("Veuillez sélectionner une date de naissance.");
			return false;
		}

		setFormError(null); // Réinitialiser les erreurs
		return true;
	};

	// Gestion de l'inscription
	const handleRegister = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		// Nettoyage des données utilisateur
		const sanitizedData = {
			firstname: DOMPurify.sanitize(firstname.trim()),
			lastname: DOMPurify.sanitize(lastname.trim()),
			email: DOMPurify.sanitize(email.trim()),
			password: DOMPurify.sanitize(password.trim()),
			phone: DOMPurify.sanitize(phone.trim()),
			birthdate: DOMPurify.sanitize(birthdate),
		};

		try {
			const response = await fetch("http://localhost:9000/api/v1/authentication/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(sanitizedData),
			});

			if (response.ok) {
				dispatch(setMsg("Compte utilisateur créé avec succès"));
				navigate("/login"); // Redirige vers la page de connexion
			} else {
				const errorData = await response.json();
				dispatch(loginFailed({ error: errorData.msg })); // Envoie l'erreur au store Redux
			}
		} catch (error) {
			console.error(error);
			dispatch(setMsg("Erreur lors de l'inscription. Veuillez réessayer."));
		}
	};

	return (
		<section className="register-form">
			<form onSubmit={handleRegister}>
				<label htmlFor="firstname">Prénom</label>
				<input
					id="firstname"
					type="text"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
					required
					aria-label="Prénom"
				/>

				<label htmlFor="lastname">Nom</label>
				<input
					id="lastname"
					type="text"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
					required
					aria-label="Nom"
				/>

				<label htmlFor="email">Email</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					aria-label="Adresse e-mail"
				/>

				<label htmlFor="password">Mot de passe</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					aria-label="Mot de passe"
				/>

				<label htmlFor="phone">Téléphone</label>
				<input
					id="phone"
					type="tel"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
					aria-label="Numéro de téléphone"
				/>

				<label htmlFor="birthdate">Date de naissance</label>
				<input
					id="birthdate"
					type="date"
					value={birthdate}
					onChange={(e) => setBirthdate(e.target.value)}
					required
					aria-label="Date de naissance"
				/>

				{formError && <p style={{ color: "red" }}>{formError}</p>}
				{msg && <p style={{ color: "green" }}>{msg}</p>}

				<button type="submit">S&apos;inscrire</button>
			</form>
		</section>
	);
};

export default Register;