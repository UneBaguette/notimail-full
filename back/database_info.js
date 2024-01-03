// database_info.js

const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    //   host: 'votre_host',
    user: 'root',
    password: '',
    database: 'notimail',
});

// Établissement de la connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }

    console.log('Connecté à la base de données');

    // Exporter la connexion pour l'utiliser dans d'autres fichiers
    module.exports = connection;
});
