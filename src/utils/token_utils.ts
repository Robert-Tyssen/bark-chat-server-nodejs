import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || '';
const tokenExpiresIn = process.env.JWT_EXPIRES_IN || '';

export interface IAccessTokenPayload {
  userId: string,
}

export const createAccessToken = (userId: string): string => {
  const accessToken: IAccessTokenPayload = { userId: userId };
  return jwt.sign(accessToken, secretKey, { expiresIn: tokenExpiresIn });
}

export const verifyAccessToken = (token: string): IAccessTokenPayload => {
  return jwt.verify(token, secretKey) as IAccessTokenPayload;
}