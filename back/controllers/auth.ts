// controllers/auth.ts

import { Request, Response } from 'express';
import connectDB from '../datasource';
import { User } from '../models/users';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';


// Contrôleur pour gérer l'authentification des utilisateurs
export const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupération du dépôt User à partir de la connexion à la base de données
    const userRepository = connectDB.getRepository(User);

    // Récupération des données d'authentification depuis le corps de la requête
    const { firm_name, password } = req.body;

    // Recherche de l'utilisateur dans la base de données par nom d'entreprise
    const user = await userRepository.findOne({ where: { firm_name } });

    // Vérification si l'utilisateur n'existe pas
    if (!user) {
      res.status(401).json({ message: "L'utilisateur n'existe pas." });
      return;
    }

    // Vérification si le mot de passe fourni correspond au mot de passe haché enregistré dans la base de données
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si les mots de passe ne correspondent pas, répond avec un statut 401 (Non autorisé) et un message d'erreur
    if (!passwordMatch) {
      res.status(401).send('Mot de passe incorrect.');
      return;
    }

    // Création du token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        firm_name: user.firm_name,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_admin,
      },
      `${process.env.SESSION_SECRET}`,
      { expiresIn: '3m' }
    );

    // Sauvegarde du token dans un cookie
    res.cookie('token', token, { maxAge: 180000, httpOnly: true });
    console.log('Token créé :', token, user.id);

    // Authentification réussie, renvoie un message de succès et les détails de l'utilisateur
    res.status(200).json({ message: 'Authentification réussie.', user });
  } catch (error) {
    // Gestion des erreurs : affichage en console et renvoi d'une réponse d'erreur au client
    console.error('Erreur lors de l\'authentification :', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification.' });
  }
};


// Contrôleur pour gérer la déconnexion des utilisateurs et renvoyer le token
export const deconnexionUser = (req: Request, res: Response): void => {
  try {
    // Récupérer le token depuis les cookies (assurez-vous que le nom du cookie est correct)
    const { token } = req.cookies;

    // Vérifier si le token existe
    if (!token) {
      res.status(401).json({ message: "Token non trouvé. L'utilisateur n'est probablement pas connecté." });
      return;
    }

    // Décoder le token pour obtenir les informations de l'utilisateur
    const decodedToken = jwt.verify(token, `${process.env.SESSION_SECRET}`) as any;

    // Répondre avec un message de déconnexion réussie et les informations de l'utilisateur extraites du token
    res.status(200).json({ message: 'Déconnexion réussie.', user: decodedToken });
    console.log(decodedToken);
    
  } catch (error) {
    // Gestion des erreurs : affichage en console et renvoi d'une réponse d'erreur au client
    console.error('Erreur lors de la déconnexion :', error);
    res.status(500).json({ message: 'Erreur lors de la déconnexion.' });
  }
};


