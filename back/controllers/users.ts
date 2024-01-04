// controllers/users.ts

import { Request, Response } from 'express';
// Importe directement l'instance connectDB depuis le fichier datasource
import connectDB from '../datasource';
import { User } from '../models/users';

// Contrôleur pour créer un utilisateur
export const createUser = async (req: Request, res: Response) => {
    try {
        const userRepository = connectDB.getRepository(User);

        const newUser = userRepository.create(req.body);
        const result = await userRepository.save(newUser);

        res.status(201).json(result);
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur serveur lors de la création de l\'utilisateur' });
    }
};
