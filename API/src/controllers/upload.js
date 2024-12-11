import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

class Upload {
    static async handleImageUpload(req) {
        try {
            // Vérifie si des fichiers sont uploadés
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("Aucun fichier uploadé.");
            }

            // Récupère le fichier photo
            const image = req.files.photo;

            // Définir une taille maximale (2MB dans cet exemple)
            const maxSize = 2 * 1024 * 1024;
            if (image.size > maxSize) {
                throw new Error("La taille du fichier dépasse 2 Mo.");
            }

            // Types de fichiers valides
            const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validMimeTypes.includes(image.mimetype)) {
                throw new Error("Format de fichier non supporté.");
            }

            // Génère un nom de fichier unique
            const extension = path.extname(image.name);
            const uniqueName = `${uuidv4()}${extension}`;

            // Chemin absolu pour enregistrer l'image dans /public/img/residents
            const uploadDir = path.join(process.cwd(), 'public', 'img', 'residents');
            const uploadPath = path.join(uploadDir, uniqueName);

            // Crée le répertoire s'il n'existe pas
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // Déplace le fichier vers le chemin défini
            await image.mv(uploadPath);

            // Retourne le chemin relatif (par rapport au serveur)
            const relativePath = `/img/residents/${uniqueName}`;
            return relativePath;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default Upload;