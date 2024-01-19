// middlewares/permissions.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

        // Récupérer le token depuis les cookies 
        const { token } = req.cookies;

    try {

        const decodedToken: any = jwt.verify(token, process.env.SESSION_SECRET || '');
        
        if (token && decodedToken.is_admin === true) {
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

