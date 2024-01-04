// routes/users.ts

// Importe express et le contrôleur des utilisateurs
import express from 'express';
import { createUser } from '../controllers/users';

// Crée un routeur Express
const router = express.Router();

// Route POST pour créer un utilisateur
router.post('/users', createUser);

// Exporte le routeur
export default router;