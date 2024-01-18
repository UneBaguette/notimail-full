import express from 'express';

const router = express.Router();

// Importation et utilisation d'autres routes
import userRoutes from './users';
import authRoutes from './auth';
import mailRoutes from './mail';

// Montage des routes sur des chemins spécifiques
router.use('/user', userRoutes); // Utilisation des routes d'utilisateur
router.use('/auth', authRoutes); // Utilisation des routes d'authentification
router.use('/mail', mailRoutes); // Utilisation des routes des mails

router.get("/", (req, res) => {
    res.status(200).json({ message: "Bienvenue sur la page d'accueil!" })
});

export default router;