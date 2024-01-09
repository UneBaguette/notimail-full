// routes/mail.ts

import express from 'express';
import { receivedMail, pickUpMail } from '../controllers/mail';
import { isAdmin, isAuthenticated } from '../middlewares/permissions';

const router = express.Router();

// Route POST pour indiquer la réception d'un courrier par l'admin a récuperer par le user
router.post('/reception-mail/:userId', receivedMail, isAdmin);

// Route POST pour indiquer la récupération d'un courrier par l'user
router.post('/picked-up-mail/:userId', pickUpMail, isAuthenticated);

export default router;