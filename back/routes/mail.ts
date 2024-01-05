// routes/mail.ts

import express from 'express';
import { receivedMail, pickUpMail } from '../controllers/mail';

const router = express.Router();

// Route POST pour indiquer la réception d'un courrier par l'admin a récuperer par le user
router.post('/reception-mail/:userId', receivedMail);

// Route POST pour indiquer la récupération d'un courrier par l'user
router.post('/picked-up-mail/:userId', pickUpMail);

export default router;