// routes/users.ts

// Importe express et le contrôleur des utilisateurs
import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/users';

// Crée un routeur Express
const router = express.Router();

// Route POST pour créer un utilisateur
router.post('/users', createUser);

// Route GET pour récupérer tous les utilisateurs
router.get('/users', getUsers);

// Route GET par ID pour récupérer un utilisateur spécifique
router.get('/users/:id', getUserById);

// Route PUT pour mettre à jour un utilisateur par ID
router.put('/users/:id', updateUser);

// Route DELETE pour supprimer un utilisateur par ID
router.delete('/users/:id', deleteUser);

// Exporte le routeur
export default router;