// routes/auth.js

// Importation du module Express
import express from 'express';

// Importation du contrôleur d'authentification
import { authUser } from '../controllers/auth';

// Création d'un objet Router d'Express
const router = express.Router();

// Toutes les routes auth commence par : auth/connexion

// Définition de la route POST '/connexion' avec le contrôleur authUser
router.post('/connexion', authUser);

// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
export default router;
