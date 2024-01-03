// index.js

// Importe le framework Express et initialise une instance de l'application
const express = require('express');
const app = express();
// Middleware express.json pour traiter les données au format JSON
app.use(express.json());


// Importe les différentes routes


// Route pour afficher un message sur la route /
app.get('/', (req, res) => {
    res.send(`Bienvenue sur la page d'accueil !`);
});

// Montage des routes sur des chemins spécifiques
// Base pour ensuite aller récuperer la route du fichier, par exemple pour user : 
// http://localhost:3000/user/users


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