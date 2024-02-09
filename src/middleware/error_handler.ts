import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error occurred processing request:\n', err);
  res.status(500).json({ error: 'Internal server error' });
}