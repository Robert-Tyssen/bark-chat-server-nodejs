import jwt from 'jsonwebtoken';

export const getLoginToken = (userId: String): string => {
  const secretKey = process.env.JWT_SECRET || '';
  const tokenExpiresIn = process.env.JWT_EXPIRES_IN || '';
  return jwt.sign({ userId: userId }, secretKey, { expiresIn: tokenExpiresIn });
}
