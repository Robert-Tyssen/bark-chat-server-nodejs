import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyAccessToken } from '../utils/token_utils';

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {

    let token = '';
    const authObj = req.headers?.authorization?.split(' ') || [];

    if (authObj.length > 1 && authObj[0] === 'Bearer') {
      token = authObj[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }

    // Attempt to verify the token
    try {
      const decodedToken = verifyAccessToken(token);
      res.locals.userId = decodedToken.userId;
      next()
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

  } catch (error) {
    console.error('Error occurred during authentication', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}