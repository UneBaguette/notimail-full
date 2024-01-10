// controllers/MailController.ts

import nodemailer from 'nodemailer'; // Import nodemailer
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

        // Met à jour la propriété 'last_received_mail' de l'objet 'user' avec la date et l'heure actuelles
        user.last_received_mail = new Date();

        // Définit la propriété 'has_mail' de l'objet 'user' à true, indiquant que l'utilisateur a reçu du courrier
        user.has_mail = true;

        // Enregistre l'objet 'user' mis à jour dans la base de données en utilisant la méthode 'save' de 'userRepository'
        await userRepository.save(user);

        // Crée un transporteur (sender) pour l'envoi d'e-mails via le service Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                // Utilise les informations d'identification stockées dans les variables d'environnement pour l'authentification Gmail
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        // Définit les options de l'e-mail, y compris l'expéditeur, le destinataire, le sujet et le corps du message
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: user.email, // Utilise l'adresse e-mail de l'utilisateur comme destinataire
            subject: 'Un nouveau courrier est disponible au 40 !',
            // Utilise une chaîne de texte formatée pour le corps du message, incluant le prénom, le nom et la date du dernier courrier reçu
            text: `Bonjour ${user.first_name} ${user.last_name}, \n Vous avez un nouveau courrier à récupérer au Bureau Le 40 ! \n Le courrier a été reçu le ${user.last_received_mail} `,
        };

        // Envoie l'e-mail en utilisant le transporteur configuré et les options d'e-mail définies
        await transporter.sendMail(mailOptions);

        // Répond avec un statut 200 et un message indiquant que la réception du courrier a été validée avec succès
        res.status(200).send({ message: 'Réception du courrier validée avec succès. Le client doit maintenant venir le récuperer' });
    } catch (error) {
        // En cas d'erreur, répond avec un statut 500 et un message d'erreur
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
    
        res.status(200).send({ message: 'Courrier récupéré par le client avec succès' });
    } catch (error) {
        res.status(500).send({ error: 'Une erreur est survenue lors de la récupération du courrier' });
    }
};