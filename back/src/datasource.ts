// Importation du module DataSource depuis TypeORM
import { DataSource } from "typeorm";

// Importation du modèle d'utilisateur
import { User } from './models/users';

// Création d'une instance DataSource pour la connexion à la base de données
const connectDB = new DataSource({
    // Spécification du type de base de données (dans ce cas, MySQL)
    type: 'mysql',

    // Récupération des informations d'environnement pour la connexion à la base de données
    host: process.env.DB_HOST,          // Adresse de l'hôte de la base de données
    port: +process.env.DB_PORT!,  // Numéro de port de la base de données (converti en nombre)
    username: process.env.DB_USERNAME,  // Nom d'utilisateur pour la connexion
    password: process.env.DB_PASSWORD,  // Mot de passe pour la connexion
    database: process.env.DB_NAME,      // Nom de la base de données

    // Désactivation de la journalisation des requêtes SQL (logging)
    logging: false,

    // Synchronisation automatique des entités avec la base de données (utilisé à des fins de développement)
    synchronize: true,

    // Liste des entités à utiliser avec TypeORM (dans ce cas, uniquement l'entité User)
    entities: [User],

    // Configuration supplémentaire, telle que la gestion du SSL
    ssl: {
        rejectUnauthorized: false // Désactive la vérification du certificat SSL (utile pour les connexions locales ou non sécurisées)
    }
    
});

// Exportation de l'instance de DataSource pour être utilisée dans d'autres parties du code
export default connectDB;
