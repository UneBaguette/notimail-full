// controllers/auth.ts

import { Request, Response } from 'express';
import connectDB from '../datasource';
import { User } from '../models/users';

export const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = connectDB.getRepository(User);

    const { email, password } = req.body;

    // Recherche de l'utilisateur par email
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: "L'utilisateur n'existe pas." });
      return;
    }

    // Vérification du mot de passe
    if (user.password !== password) {
      res.status(401).json({ message: 'Mot de passe incorrect.' });
      return;
    }

    // Authentification réussie
    res.status(200).json({ message: 'Authentification réussie.', user });
  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification.' });
  }
};
