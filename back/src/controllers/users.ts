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

// Définition d'une fonction contrôleur pour récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {
    try {
        // Récupération du référentiel (repository) d'utilisateurs depuis la base de données
        const userRepository = connectDB.getRepository(User);

        // Récupération de tous les utilisateurs depuis la base de données en enlevant le Password
        const users = await userRepository.find({
            select: ['id', 'firm_name', 'first_name', 'last_name', 'email', 'phone_number', 'last_received_mail', 'last_picked_up', 'has_mail', 'is_admin'],
        });

        // Réponse au client avec un code HTTP 200 (OK) et les données des utilisateurs récupérés
        res.status(200).json(users);
    } catch (error) {
        // Gestion des erreurs : Affichage de l'erreur dans la console
        console.error('Erreur lors de la récupération des utilisateurs :', error);

        // Réponse au client avec un code HTTP 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs' });
    }
};

// Définition d'une fonction contrôleur pour récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        // Récupération du référentiel (repository) d'utilisateurs depuis la base de données
        const userRepository = connectDB.getRepository(User);

        // Récupération de l'ID utilisateur depuis les paramètres de la requête
        const userId = parseInt(req.params.id, 10);

        // Recherche de l'utilisateur dans la base de données par ID
        const user = await userRepository.findOne({
            where: { id: userId },
            select: ['id', 'firm_name', 'first_name', 'last_name', 'email', 'phone_number', 'last_received_mail', 'last_picked_up', 'has_mail', 'is_admin'],
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        // Réponse au client avec un code HTTP 200 (OK) et les données de l'utilisateur récupéré
        res.status(200).json(user);
    } catch (error) {
        // Gestion des erreurs : Affichage de l'erreur dans la console
        console.error('Erreur lors de la récupération de l\'utilisateur par ID :', error);

        // Réponse au client avec un code HTTP 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ error: 'Erreur serveur lors de la récupération de l\'utilisateur par ID' });
    }
};

// Définition d'une fonction contrôleur pour mettre à jour un utilisateur par ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        // Récupération du référentiel (repository) d'utilisateurs depuis la base de données
        const userRepository = connectDB.getRepository(User);

        // Récupération de l'ID utilisateur depuis les paramètres de la requête
        const userId = parseInt(req.params.id, 10);

        // Recherche de l'utilisateur dans la base de données par ID
        const user = await userRepository.findOne({
            where: { id: userId },
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        // Vérification de la propriété isAdmin dans la requête, 
        // S'il y en à 2 en BDD, alors on peut passer un admin de true à false
        // Ca évite de supprimer par inadvertance le seul admin du site lorsqu'on update un user
        if ('is_admin' in req.body && req.body.is_admin === false) {
            // Si la mise à jour vise à réduire le statut d'administrateur

            // Comptez le nombre total d'administrateurs
            const adminCount = await userRepository.count({ where: { is_admin: true } });

            // Assurez-vous qu'il y a au moins deux administrateurs
            if (adminCount < 2) {
                res.status(400).json({ error: 'Il doit y avoir au moins deux administrateurs' });
                return;
            }
        }

        // Fusion des données de la requête dans l'objet utilisateur existant
        userRepository.merge(user, req.body);

        // Sauvegarde des modifications dans la base de données
        const updatedUser = await userRepository.save(user);

        // Réponse au client avec un code HTTP 200 (OK) et les données de l'utilisateur mis à jour
        res.status(200).json(updatedUser);
    } catch (error) {
        // Gestion des erreurs : Affichage de l'erreur dans la console
        console.error('Erreur lors de la mise à jour de l\'utilisateur par ID :', error);

        // Réponse au client avec un code HTTP 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l\'utilisateur par ID' });
    }
};

// Définition d'une fonction contrôleur pour supprimer un utilisateur par ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        // Récupération du référentiel (repository) d'utilisateurs depuis la base de données
        const userRepository = connectDB.getRepository(User);

        // Récupération de l'ID utilisateur depuis les paramètres de la requête
        const userId = parseInt(req.params.id, 10);

        // Recherche de l'utilisateur dans la base de données par ID
        const user = await userRepository.findOne({
            where: { id: userId },
        });

        // Vérification de l'existence de l'utilisateur
        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        // Suppression de l'utilisateur de la base de données
        await userRepository.remove(user);

        // Réponse au client avec un code HTTP 200 (OK) et un message indiquant que l'utilisateur a été supprimé
        res.status(200).json({message: 'Utilisateur supprimé'});
    } catch (error) {
        // Gestion des erreurs : Affichage de l'erreur dans la console
        console.error('Erreur lors de la suppression de l\'utilisateur par ID :', error);

        // Réponse au client avec un code HTTP 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ error: 'Erreur serveur lors de la suppression de l\'utilisateur par ID' });
    }
};