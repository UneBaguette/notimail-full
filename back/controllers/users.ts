// controllers/users.ts

// Importation des modules nécessaires pour gérer les requêtes HTTP et le hachage de mot de passe
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import connectDB from '../datasource'; // Importation de l'instance de connexion à la base de données
import { User } from '../models/users'; // Importation du modèle d'utilisateur défini dans '../models/users'

// Définition d'une fonction contrôleur pour créer un nouvel utilisateur
export const createUser = async (req: Request, res: Response) => {
    try {
        // Récupération du référentiel (repository) d'utilisateurs depuis la base de données
        const userRepository = connectDB.getRepository(User); 

        // Vérification que le mot de passe est présent et est égal à 4 chiffres
        const password = req.body.password; // Récupération du mot de passe depuis le corps de la requête
        if (!password || password.length !== 4 || !/^\d+$/.test(password)) {
            // Si le mot de passe est absent, a une longueur différente de 4 ou contient des caractères autres que des chiffres
            throw new Error('Mot de passe invalide'); // Lancer une erreur avec un message approprié
        }

        // Hachage du mot de passe avec bcrypt (une technique de sécurisation des mots de passe)
        const hashedPassword = await bcrypt.hash(password, 10); // Utilisation de bcrypt pour hacher le mot de passe avec un coût de hachage de 10

        // Création d'un nouvel utilisateur avec le mot de passe haché et les autres données fournies dans la requête
        const newUser = userRepository.create({
            ...req.body, // Utilisation de l'opérateur de décomposition pour copier toutes les propriétés de req.body
            password: hashedPassword // Remplacement du mot de passe non haché par le mot de passe haché dans le nouvel utilisateur
        });

        // Sauvegarde du nouvel utilisateur dans la base de données
        const result = await userRepository.save(newUser);

        // Réponse au client avec un code HTTP 201 (Créé) et les données de l'utilisateur créé
        res.status(201).json(result);
    } catch (error) {
        // Gestion des erreurs : Affichage de l'erreur dans la console et envoi d'une réponse au client avec un code HTTP 500 (Erreur serveur)
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur' });
    }
};

// Fonction pour récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {
    try {
        const userRepository = connectDB.getRepository(User);

        const users = await userRepository.find();

        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs' });
    }
};

// Fonction pour récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userRepository = connectDB.getRepository(User);

        const id = req.params.id;
        const user = await userRepository.findOne( id );

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur par ID :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'utilisateur par ID' });
    }
};

// Fonction pour mettre à jour un utilisateur par ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const userRepository = connectDB.getRepository(User);

        const id = req.body;
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        userRepository.merge(user, req.body);
        const updatedUser = await userRepository.save(user);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur par ID :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur par ID' });
    }
};

// Fonction pour supprimer un utilisateur par ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userRepository = connectDB.getRepository(User);

        const id = req.body;
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        await userRepository.remove(user);

        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur par ID :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'utilisateur par ID' });
    }
};