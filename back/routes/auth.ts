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

// Définition de la route POST pour récupérer tous les utilisateurs
router.get('/users', authUser, isAdmin, getUsers);

// Route GET par ID pour récupérer un utilisateur spécifique
router.get('/users/:id', authUser, getUserById,)

// Route PUT pour mettre à jour un utilisateur par ID
router.put('users/:id', authUser, isAdmin, updateUser)

// Route DELETE pour supprimer un utilisateur par ID
router.delete('/users/:id', authUser, isAdmin, deleteUser)

// Définition de la route GET '/deconnexion' avec le contrôleur deconnexionUser
router.get('/deconnexion', deconnexionUser);




// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
export default router;
