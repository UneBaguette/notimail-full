// middlewares/permissions.ts

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';




// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Récupérer l'objet user à partir du corps de la requête
    const user = req.body.user as User;

    // Vérifier si l'utilisateur est administrateur
    if (user && user.is_admin) {
        // Si l'utilisateur est administrateur, passer à la prochaine fonction de middleware ou route
        next();
    } else {
        // Si l'utilisateur n'est pas administrateur, renvoyer une réponse interdite (403)
        res.status(403).json({ error: 'Accès non autorisé. Vous devez être administrateur.' });
    }
};