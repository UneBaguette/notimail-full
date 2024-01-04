// routes/auth.js

import express from 'express'

import { authUser } from '../controllers/auth'

const router = express.Router()

router.post('/connexion', authUser)

export default router