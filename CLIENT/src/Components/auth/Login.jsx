import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginFailed, setMsg } from "../../store/Slices/user"; // Importer les actions nécessaires
import useCloseMenu from "../../Hooks/useCloseMenu";
import DOMPurify from "dompurify"; // Pour sécuriser les entrées utilisateur

const Login = () => {
	useCloseMenu();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState(null); // Gestion des erreurs de formulaire
	const dispatch = useDispatch();
	const { authError } = useSelector((state) => state.user); // Message d'erreur éventuel

	const validateForm = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Vérification d'un email valide
		if (!emailRegex.test(email)) {
			setFormError("Veuillez entrer une adresse e-mail valide.");
			return false;
		}
		if (password.length < 8) {
			setFormError("Le mot de passe doit comporter au moins 8 caractères.");
			return false;
		}
		setFormError(null); // Réinitialiser les erreurs
		return true;
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		try {
			const sanitizedEmail = DOMPurify.sanitize(email.trim());
			const sanitizedPassword = DOMPurify.sanitize(password.trim());

			// Simuler une requête d'authentification vers le serveur
			const response = await fetch("http://localhost:9000/api/v1/authentication/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: sanitizedEmail, password: sanitizedPassword }),
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				dispatch(login(data)); // Dispatch la connexion avec les infos de l'utilisateur
				navigate("/"); // Rediriger vers la page d'accueil
			} else {
				const errorData = await response.json();
				dispatch(loginFailed({ error: errorData.msg })); // Gestion d'une erreur de login
			}
		} catch (error) {
			dispatch(setMsg("Erreur lors de la connexion. Veuillez réessayer.")); // Gestion d'une erreur de connexion
		}
	};

	return (
		<section className="login-form">
			<form onSubmit={handleLogin}>
				<label htmlFor="email">E-mail</label>
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
					minLength={6}
				/>
				{formError && <p style={{ color: "red" }}>{formError}</p>}
				{authError && <p style={{ color: "red" }}>{authError}</p>}
				<button type="submit">Se connecter</button>
				<p>
					Pas de compte ?{" "}
					<button type="button" onClick={() => navigate("/register")}>
						S&apos;inscrire
					</button>
				</p>
			</form>
		</section>
	);
};

export default Login;