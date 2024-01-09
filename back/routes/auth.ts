// routes/auth.js

// Importation du module Express
import express from 'express';

// // Importation du contrôleur d'authentification
// import { authUser } from '../controllers/auth';

// import { deconnexionUser } from '../controllers/auth';

import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/users';
import { isAdmin, isAuthenticated } from '../middlewares/permissions'; // Ajouter ces imports


// Création d'un objet Router d'Express
const router = express.Router();

// Toutes les routes auth commence par : auth/connexion

// Route POST pour créer un utilisateur
router.post('/users', isAuthenticated, isAdmin, createUser);

// Route GET pour récupérer tous les utilisateurs
router.get('/users', isAuthenticated, isAdmin, getUsers);

// Route GET par ID pour récupérer un utilisateur spécifique
router.get('/users/:id', isAuthenticated, getUserById);

// Route PUT pour mettre à jour un utilisateur par ID
router.put('/users/:id', isAuthenticated, isAdmin, updateUser);

// Route DELETE pour supprimer un utilisateur par ID
router.delete('/users/:id', isAuthenticated, isAdmin, deleteUser);


// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
export default router;
