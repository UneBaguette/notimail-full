// Importe dotenv et Charge les variables d'environnement à partir du fichier .env
import dotenv from 'dotenv'; 
dotenv.config();

// Importe le router pour la gestion des routes de l'application
import router from './routes';

// Importe le framework Express et ExpressSession et initialise une instance de l'application
import express from 'express';
import session from 'express-session';
const app = express();

// Importe le module cookie-parser pour analyser les cookies
import cookieParser from 'cookie-parser';
app.use(cookieParser()); // Utilise le middleware cookie-parser dans l'application Express

import connectDB from './datasource';
// Importation du module CORS
import cors from "cors";

// Middleware express.json pour traiter les données au format JSON
app.use(express.json());

// Middleware CORS pour gérer les politiques CORS
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true,
}));

console.log('Clé secrète de la session:', process.env.SESSION_SECRET !);

// Utilise express-session pour gérer les sessions
app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
}));

// Utilise l'instance de DataSource initialisée
connectDB.initialize()
    .catch((err) => {
        console.error(`Erreur lors de l'initialisation de l'accès à la BDD`, err);
    });

app.use('/', router);

// Middleware pour gérer toutes les autres routes (404: Page not found)
app.use((req, res) => {
    // Envoi d'une réponse avec le statut 404 et le message '404: Page not found'
    res.status(404).send('404: Page not found');
});

export default app;