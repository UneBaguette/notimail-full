// controllers/auth.ts

import { Request, Response } from 'express';
import connectDB from '../datasource';
import { User } from '../models/users';
import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as bcrypt from 'bcrypt'; // Importez la bibliothèque bcrypt

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

    // Génération d'une clé secrète aléatoire de 32 octets (256 bits)
    const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
    console.log('Clé secrète générée :', secretKey);

    // Création du token JWT
    const token = jwt.sign({ userId: user.id }, `${secretKey}`, { expiresIn: '3m' });

    // Sauvegarde du token dans un cookie
    res.cookie('token', token, { maxAge: 180000, httpOnly: true });

    // Authentification réussie, renvoie un message de succès et les détails de l'utilisateur
    res.status(200).json({ message: 'Authentification réussie.', user });
  } catch (error) {
    // Gestion des erreurs : affichage en console et renvoi d'une réponse d'erreur au client
    console.error('Erreur lors de l\'authentification :', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification.' });
  }
};



// Contrôleur pour gérer la déconnexion des utilisateurs
export const deconnexionUser = (req: Request, res: Response): void => {
  try {
    // Effacer le cookie contenant le token
    res.clearCookie('token');

    // Répondre avec un message de déconnexion réussie
    res.status(200).json({ message: 'Déconnexion réussie.' });
  } catch (error) {
    // Gestion des erreurs : affichage en console et renvoi d'une réponse d'erreur au client
    console.error('Erreur lors de la déconnexion :', error);
    res.status(500).json({ message: 'Erreur lors de la déconnexion.' });
  }
};