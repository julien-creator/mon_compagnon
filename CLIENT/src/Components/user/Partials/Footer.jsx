import React from 'react';
import '../../../assets/index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <section className="footer__container">


                <address className="footer__column">
                    <h2>Contact</h2>
                    <p>Téléphone : <a href="tel:+33123456789">+33 1 23 45 67 89</a></p>
                    <p>Email : <a href="mailto:contact@refuge.com">contact@refuge.com</a></p>
                    <p>Adresse : 123 Rue des Animaux, 14600 Honfleur, France</p>
                </address>


                <section className="footer__column">
                    <h2>Suivez-nous</h2>
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faXTwitter} /></a></li>
                    </ul>
                </section>
            </section>


            <section className="footer__legal">
                <p>&copy; {new Date().getFullYear()} Mon Compagnon. Tous droits réservés.</p>
                <p>
                    <a href="/mentions-legales">Mentions légales</a> |
                    <a href="/politique-confidentialite"> Politique de confidentialité</a>
                </p>
            </section>
        </footer>
    );
}

export default Footer;