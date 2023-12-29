import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const [, token] = authorization.trim().split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    if (verified) {
      next();
    }
  } catch (error) {
      return res.status(401).json(error);
  }
};

export default authMiddleware;