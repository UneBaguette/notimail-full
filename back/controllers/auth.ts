// controllers/auth.ts



// Importation des modules nécessaires depuis Express et les fichiers locaux
import { Request, Response } from 'express';
import connectDB from '../datasource'; // Importation de la connexion à la base de données
import { User } from '../models/users'; // Importation du modèle User

// Contrôleur pour gérer l'authentification des utilisateurs
export const authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Récupération du dépôt User à partir de la connexion à la base de données
    const userRepository = connectDB.getRepository(User);

    // Récupération des données d'authentification depuis le corps de la requête
    const { email, password } = req.body;

    // Recherche de l'utilisateur dans la base de données par email
    const user = await userRepository.findOne({ where: { email } });

    // Vérification si l'utilisateur n'existe pas
    if (!user) {
      res.status(401).json({ message: "L'utilisateur n'existe pas." });
      return;
    }

    // Vérification si le mot de passe fourni correspond à celui enregistré dans la base de données
    if (user.password !== password) {
      res.status(401).json({ message: 'Mot de passe incorrect.' });
      return;
    }

    // Authentification réussie, renvoie un message de succès et les détails de l'utilisateur
    res.status(200).json({ message: 'Authentification réussie.', user });
  } catch (error) {
    // Gestion des erreurs : affichage en console et renvoi d'une réponse d'erreur au client
    console.error('Erreur lors de l\'authentification :', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification.' });
  }
};
