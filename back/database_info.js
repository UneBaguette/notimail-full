// database_info.js

// Importe le module mysql.
const mysql = require('mysql');

// Définit les paramètres de connexion à MySQL.
const mysqlConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'notimail',
};

// Établit une connexion à MySQL en utilisant les paramètres de connexion spécifiés.
const connection = mysql.createConnection(mysqlConfig);

// Connexion à la base de données MySQL.
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL :', err);
    } else {
        console.log('Connecté à la base de données MySQL');
    }
});

// Exporte l'objet de connexion MySQL pour qu'il puisse être utilisé dans d'autres fichiers.
module.exports = connection;
