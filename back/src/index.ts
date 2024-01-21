import app from './app';

const PORT = process.env.BACK_PORT || 3000;

// Écoute sur le port donné dans le .env et affiche un message lorsque le serveur démarre
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});