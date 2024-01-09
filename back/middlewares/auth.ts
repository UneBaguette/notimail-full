// middlewares/permissions.ts

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';

// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.user as User;

    if (user && user.is_admin) {
        next();
    } else {
        res.status(403).json({ error: 'Accès non autorisé. Vous devez être administrateur.' });
    }
};

// Middleware pour vérifier si l'utilisateur est authentifié
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (user) {
        next();
    } else {
        res.status(401).json({ error: 'Non autorisé. Vous devez être connecté.' });
    }
};