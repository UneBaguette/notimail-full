// middlewares/permissions.ts

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';
import * as jwt from 'jsonwebtoken';





// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

        // Récupérer le token depuis les cookies (assurez-vous que le nom du cookie est correct)
        const { token } = req.cookies;
        console.log(token)

    try {
        const decodedToken: any = jwt.verify(token, process.env.SESSION_SECRET || '');

        console.log('Decoded Token:', decodedToken);

        
        if (token && decodedToken.is_admin) {
            // Si l'utilisateur est administrateur, passer à la route suivante
            next();
        } else {
            // Sinon, renvoyer une réponse non autorisée
            res.status(403).json({ error: 'Access forbidden. User is not an admin' });
        }
    } catch (error) {
        // En cas d'erreur lors de la vérification du token, renvoyer une réponse non autorisée
        res.status(401).json({ error: 'Invalid token' });
    }


};



// Middleware pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    // Récupérer le token depuis les cookies (assurez-vous que le nom du cookie est correct)
    const { token } = req.cookies;

    // Vérifier si le token existe
    if (!token) {
        res.status(401).json({ message: "Token non trouvé. L'utilisateur n'est probablement pas connecté." });
        return;
    }

    if (token) {
        next();
    } else {
        res.status(401).json({ error: 'Non autorisé. Vous devez être connecté.' });
    }
};