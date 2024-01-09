// routes/users.ts

// Importe express et le contrôleur des utilisateurs
import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/users';
import { isAdmin } from '../middlewares/permissions';

// Crée un routeur Express
const router = express.Router();

// Toutes les routes users commence par : user/users

// Route POST pour créer un utilisateur
router.post('/users', createUser, isAdmin);

// Route GET par ID pour récupérer un utilisateur spécifique
router.get('/users/:id', getUserById, isAdmin)

// Définition de la route GET pour récupérer tous les utilisateurs
router.get('/users', getUsers);

// Route PUT pour mettre à jour un utilisateur par ID
router.put('users/:id', updateUser, isAdmin)

// Route DELETE pour supprimer un utilisateur par ID
router.delete('/users/:id', deleteUser, isAdmin)

// Exporte le routeur
export default router;