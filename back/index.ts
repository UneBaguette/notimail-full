// index.ts

// Importe le framework Express et initialise une instance de l'application
import express from 'express';
import session from 'express-session';
import connectDB from './datasource';
import crypto from 'crypto';

const app = express();

// Middleware express.json pour traiter les données au format JSON
app.use(express.json());

// Utilise l'instance de DataSource initialisée
connectDB.initialize()
    .then(() => {
        console.log(`L'accès à la BDD a été initialisée avec succès`);
    })
    .catch((err) => {
        console.error(`Erreur lors de l'initialisation de l'accès à la BDD`, err);
    });

// Importe les différentes routes
import userRoutes from './routes/users';  // Importe les routes d'utilisateur
import authRoutes from './routes/auth'; // Importe les routes d'authentification

// Route pour afficher un message sur la route /
app.get('/', (req, res) => {
    res.send(`Bienvenue sur la page d'accueil !`);
});

// Montage des routes sur des chemins spécifiques
app.use('/user', userRoutes); // Utilisation des routes d'utilisateur
app.use('/auth', authRoutes); // Utilisation des routes d'authentification

// Génération d'une clé secrète aléatoire de 32 octets (256 bits)
const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
console.log('Clé secrète générée :', secretKey);

// Utilisation de session avec une clé secrète
app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware pour gérer toutes les autres routes (404: Page not found)
app.use((req, res) => {
    // Envoi d'une réponse avec le statut 404 et le message '404: Page not found'
    res.status(404).send('404: Page not found');
});

// Écoute sur le port 3000 et affiche un message lorsque le serveur démarre
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
