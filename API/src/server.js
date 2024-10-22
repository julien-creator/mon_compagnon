import "dotenv/config";
import fileUpload from 'express-fileupload';
import express from "express";
import path from "path";
import cors from "cors";
import session from "express-session";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

import ROUTER from "./router/index.routes.js";


const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;

// Configurer CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type"],
    })
);

// Configurer les sessions
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 24h
            httpOnly: true,
            secure: false,
        },
        store: new MySQLStore({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        }),
    })
);

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite la taille à 50 MB
}));
app.use("/img", express.static(path.join(process.cwd(), "public/img")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger pour les sessions actives
app.use(async (req, res, next) => {
    console.log("user session", req.session.user);
    next();
});

// Routes (à ajouter plus tard)
app.use(["/api/v1", "/"], ROUTER);

// Lancer le serveur
app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);


/*
import "dotenv/config";
import express from 'express';
//import path from "path";

import ROUTER from "./router/index.routes.js";
import pool from "./config/db.js";

const app = express();


const PORT = process.env.PORT || process.env.LOCAL_PORT;



app.use(["/api/v1", "/"], ROUTER);

app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);

*/