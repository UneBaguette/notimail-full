// controllers/MailController.ts

import nodemailer from 'nodemailer'; // Import nodemailer
import connectDB from '../datasource'; // Importation de l'instance de connexion à la base de données
import { Request, Response } from 'express';
import { User } from '../models/users';
import axios from 'axios';

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

        // ENVOI NOTIF PAR MAIL //
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

        // ENVOI NOTIF PAR SMS //
        // Définition des options pour envoyer un SMS
        const smsOptions = {
            from: 'Le 40', // Spécifie l'émetteur du SMS, le nom qui apparaîtra comme expéditeur
            to: user.phone_number, // Spécifie le numéro de téléphone du destinataire du SMS
            text: 'Vous avez un nouveau courrier à récupérer au Bureau Le 40 !', // Texte du message SMS à envoyer
        };

        // Définition des options de la requête HTTP pour envoyer le SMS via l'API d'AllMySMS
        const requestOptions = {
            method: 'POST', // Méthode HTTP utilisée pour l'envoi du SMS (POST dans ce cas)
            url: process.env.SMS_URL, // URL de l'API AllMySMS pour l'envoi de SMS, stocké dans les variables d'environnement

            // En-têtes de la requête HTTP, spécifiant les détails de la requête
            headers: {
                'cache-control': 'no-cache', // Désactive le cache pour éviter des problèmes liés à la mise en cache
                'Authorization': process.env.SMS_AUTH_TOKEN, // Autorisation pour accéder à l'API AllMySMS, utilise le jeton d'authentification stocké dans les variables d'environnement
                'Content-Type': 'application/json', // Indique que le contenu de la requête est au format JSON
            },

            // Corps de la requête, contenant les options du SMS définies précédemment
            data: smsOptions,
        };

        // Affiche les options de la requête dans la console (peut être utile pour le débogage)
        //console.log(requestOptions);

        // Envoie la requête HTTP pour envoyer le SMS via l'API AllMySMS en utilisant Axios
        try {
            const response = await axios(requestOptions);
        
            // Vérifiez la réponse d'AllmySMS et ajustez votre gestion d'erreur si nécessaire
            if (response.status === 201 && response.data.code === 100) {
                console.log('SMS envoyé avec succès');
            } else {
                console.error('Erreur lors de l\'envoi du SMS:', response.data.code, response.data.description);
            }
        
            // Répond avec un statut 200 et un message indiquant que la réception du courrier a été validée avec succès
            res.status(200).send({ message: 'Réception du courrier validée avec succès. Le client doit maintenant venir le récupérer' });
        } catch (error) {
            // En cas d'erreur lors de l'envoi du SMS, affiche l'erreur dans la console
            console.error('Erreur lors de l\'envoi du SMS:', error);
        
            // Répond avec un statut 500 et un message d'erreur indiquant le problème
            res.status(500).send({ error: 'Une erreur est survenue lors de l\'envoi du SMS' });
        }
        
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