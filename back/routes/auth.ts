// routes/auth.js

// Importation du module Express
import express from 'express';

// Importation du contrôleur d'authentification
import { authUser, deconnexionUser, getFirmnames, getInfoUserConnected } from '../controllers/auth';
import { checkAuth } from '../middlewares/auth';


// Création d'un objet Router d'Express
const router = express.Router();

// Toutes les routes auth commence par : auth/connexion

// Definition de la route POST '/connexion' avec le contrôleur authUser
router.post('/connexion', authUser)

// Définition de la route GET firm_name pour récupérer uniquement les firm_name des entreprise lors du login
router.get('/firm_names', getFirmnames)

// Définition de la route GET '/deconnexion' avec le contrôleur deconnexionUser
router.get('/deconnexion', checkAuth, deconnexionUser);

// Définition de la route GET '/connecteduser' avec le contrôleur getUserInfo
router.get('/connecteduser', checkAuth, getInfoUserConnected);

// Exportation du routeur pour qu'il puisse être utilisé ailleurs dans l'application
export default router;
