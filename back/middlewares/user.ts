// middlewares/userMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const validateUserId = (req: Request, res: Response, next: NextFunction): void => {
  const userId = parseInt(req.params.id, 10);

  // Vérification de la validité de l'ID
  if (isNaN(userId)) {
    res.status(400).json({ error: 'ID utilisateur invalide' });
    return;
  }

  req.body.userId = userId;
  next();
};
