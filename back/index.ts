// index.ts

// Importe dotenv et Charge les variables d'environnement à partir du fichier .env
import dotenv from 'dotenv'; 
dotenv.config(); 

// Importe le framework Express et ExpressSession et initialise une instance de l'application
import express from 'express';
import session from 'express-session';
const app = express();

// Importe le module cookie-parser pour analyser les cookies
import cookieParser from 'cookie-parser';
// Utilise le middleware cookie-parser dans l'application Express
app.use(cookieParser());

import connectDB from './datasource';
// Importation du module CORS
const cors = require('cors');

// Middleware express.json pour traiter les données au format JSON
app.use(express.json());

// Middleware CORS pour gérer les politiques CORS
app.use(cors());

// Utilise l'instance de DataSource initialisée
connectDB.initialize()
    .then(() => {
        console.log(`L'accès à la BDD a été initialisée avec succès`);
    })
    .catch((err) => {
        console.error(`Erreur lors de l'initialisation de l'accès à la BDD`, err);
    });

// Génération d'une clé secrète aléatoire de 32 octets (256 bits)
const secretKey = process.env.SESSION_SECRET !;
console.log('Clé secrète générée :', secretKey);

// Utilise express-session pour gérer les sessions
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
}));

// Importe les différentes routes
import userRoutes from './routes/users';  // Importe les routes d'utilisateur
import authRoutes from './routes/auth'; // Importe les routes d'authentification
import mailRoutes from './routes/mail'; // Importe les routes des mails

// Route pour afficher un message sur la route /
app.get('/', (req, res) => {
    res.send(`Bienvenue sur la page d'accueil !`);
});

// Montage des routes sur des chemins spécifiques
app.use('/user', userRoutes); // Utilisation des routes d'utilisateur
app.use('/auth', authRoutes); // Utilisation des routes d'authentification
app.use('/mail', mailRoutes); // Utilisation des routes des mails

// Middleware pour gérer toutes les autres routes (404: Page not found)
app.use((req, res) => {
    // Envoi d'une réponse avec le statut 404 et le message '404: Page not found'
    res.status(404).send('404: Page not found');
});

// Écoute sur le port donné dans le .env et affiche un message lorsque le serveur démarre
app.listen(process.env.BACK_PORT, () => {
    console.log(`Serveur en écoute sur le port ${process.env.BACK_PORT}`);
});
