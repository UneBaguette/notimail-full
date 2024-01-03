// models/users.js

const connection = require('../database_info');

// Requête SQL pour créer la table "users"
const createTableUser = `
  CREATE TABLE IF NOT EXISTS users (
    id PRIMARY KEY NOT NULL,
    firm_name String(25),
    first_name String(25),
    last_name String(25),
    email String(50) NOT NULL,
    phone_number String(25) NOT NULL,
    password String(25),
    last_received_mail TIMESTAMP,
    last_picked_up TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    has_mail BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false
  )
`;

// Exécution de la requête pour créer la table
connection.query(createTableUser, (err, results, fields) => {
  if (err) {
    console.error('Erreur lors de la création de la table :', err);
  } else {
    console.log('Table "users" créée avec succès');
  }

  // Fermeture de la connexion à la base de données après la création de la table
  connection.end();
});