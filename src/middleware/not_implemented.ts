import { NextFunction, Request, Response } from 'express';

export const notImplemented = (req: Request, res: Response, next: NextFunction) => {
  res.status(501).json({ message: 'Not Implemented' });
}