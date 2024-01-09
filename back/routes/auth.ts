// routes/auth.js

// Importation du module Express
import express from 'express';

// Importation du contrôleur d'authentification
import { authUser } from '../controllers/auth';

import { deconnexionUser } from '../controllers/auth';
import { isAdmin } from '../middlewares/permissions';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/users';


// Création d'un objet Router d'Express
const router = express.Router();

// Toutes les routes auth commence par : auth/connexion

// Route POST pour créer un utilisateur
router.post('/users',  authUser, isAdmin, createUser)

router.post('/connexion', authUser)

// Définition de la route GET '/deconnexion' avec le contrôleur deconnexionUser
router.get('/deconnexion', deconnexionUser);




// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
export default router;
