// middlewares/permissions.ts

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';

// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    
    const user = req.body.user as User;

    if (user && user.is_admin) {
        next();
    } else {
        res.status(403).json({ error: 'Accès non autorisé. Vous devez être administrateur.' });
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