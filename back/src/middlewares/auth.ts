// middlewares/checkAuth.ts

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Middleware pour vérifier si l'utilisateur est connecté
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    
    // Récupérer le token d'authentification depuis les cookies de la requête
    const { token } = req.cookies;

    // Vérifier si le token existe
    if (!token) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        res.redirect('/');
        return;
    }

    try {
        // Décoder le token pour obtenir les informations de l'utilisateur
        const decodedToken = jwt.verify(token, `${process.env.SESSION_SECRET}`) as any;
        
        // Ajouter les informations de l'utilisateur à l'objet de requête
        req.body = decodedToken;

        // La constante isUserConnected devrait être un booléen indiquant si l'utilisateur est connecté
        const isUserConnected = true; // ou utilisez une logique appropriée basée sur les informations de l'utilisateur

        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        if (!isUserConnected) {
            res.redirect('/connexion');
            return;
        }

        next(); // Passer à la prochaine fonction de middleware ou route
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification :', error);
        res.status(500).json({ message: 'Erreur lors de la vérification de l\'authentification.' });
    }
};

