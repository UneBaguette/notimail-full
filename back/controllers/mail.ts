// controllers/MailController.ts

import connectDB from '../datasource'; // Importation de l'instance de connexion à la base de données
import { Request, Response } from 'express';
import { User } from '../models/users';

export const receivedMail = async (req: Request, res: Response) => {
    try {
        // Récupération du référentiel (repository) d'utilisateurs depuis la base de données
        const userRepository = connectDB.getRepository(User);

        // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
        const userId = parseInt(req.params.userId);

        // Utilisation du référentiel pour trouver un utilisateur par son ID
        // Note: On utilise `findOneOrFail` pour s'assurer que l'utilisateur est trouvé, sinon une exception est levée
        const user = await userRepository.findOneOrFail({ where: { id: userId } });

        //console.log(userId);

        // Valider la réception du courrier
        user.last_received_mail = new Date(); // Indique la date de réception
        user.has_mail = true; // Réinitialise has_mail en true pour indiquer qu'il y a un mail
        
        await userRepository.save(user);      

        // Envoi de notifications par email et SMS (ajoutez votre logique ici)

        res.status(200).send({ message: 'Réception du courrier validée avec succès' });
    } catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue lors de la validation de la réception du courrier' });
    }
};

export const pickUpMail = async (req: Request, res: Response) => {
    try {
        // Récupération du référentiel (repository) d'utilisateurs depuis la base de données
        const userRepository = connectDB.getRepository(User);

        // Récupération de l'ID de l'utilisateur à partir des paramètres de la requête
        const userId = parseInt(req.params.userId);

        // Utilisation du référentiel pour trouver un utilisateur par son ID
        // Note: On utilise `findOneOrFail` pour s'assurer que l'utilisateur est trouvé, sinon une exception est levée
        const user = await userRepository.findOneOrFail({ where: { id: userId } });

        // Valider la récupération du courrier
        user.last_picked_up = new Date();
        user.has_mail = false;
    
        await userRepository.save(user);
    
        res.status(200).send({ message: 'Courrier récupéré avec succès' });
    } catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue lors de la récupération du courrier' });
    }
};