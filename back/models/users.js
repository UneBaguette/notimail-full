const connection = require('../index');

// Requête SQL pour créer la table "users"
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firm_name String(25),
    first_name String(25),
    last_name 
  )
`;

// Exécution de la requête pour créer la table
connection.query(createTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Erreur lors de la création de la table :', err);
  } else {
    console.log('Table "users" créée avec succès');
  }

  // Fermeture de la connexion à la base de données après la création de la table
  connection.end();
});
