// routes/users.ts

// Importe express et le contrôleur des utilisateurs
import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/users';
import { isAdmin } from '../middlewares/permissions';
import { authUser } from '../controllers/auth';

// Crée un routeur Express
const router = express.Router();

// Toutes les routes users commence par : user/users

// Route POST pour créer un utilisateur
router.post('/users', createUser, isAdmin, createUser);

// Route GET par ID pour récupérer un utilisateur spécifique
router.get('/users/:id', authUser, getUserById,)

// Définition de la route POST pour récupérer tous les utilisateurs
router.get('/users', authUser, isAdmin, getUsers);

// Route GET par ID pour récupérer un utilisateur spécifique
router.get('/users/:id', getUserById);

// Route PUT pour mettre à jour un utilisateur par ID
router.put('users/:id', authUser, isAdmin, updateUser)

// Route DELETE pour supprimer un utilisateur par ID
router.delete('/users/:id', authUser, isAdmin, deleteUser)

// Exporte le routeur
export default router;