// routes/auth.js

// Importation du module Express
import express from 'express';

// Importation du contrôleur d'authentification
import { authUser, deconnexionUser, getInfoUserConnected } from '../controllers/auth';
import { isAuthenticated } from '../middlewares/permissions';


// Création d'un objet Router d'Express
const router = express.Router();

// Toutes les routes auth commence par : auth/connexion

// Definition de la route POST '/connexion' avec le contrôleur authUser
router.post('/connexion', authUser)

// Définition de la route GET '/deconnexion' avec le contrôleur deconnexionUser
router.get('/deconnexion', isAuthenticated, deconnexionUser);

// Définition de la route GET '/connecteduser' avec le contrôleur getUserInfo
router.get('/connecteduser', isAuthenticated, getInfoUserConnected);

// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
export default router;
