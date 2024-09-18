import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'default-secret';

export const generateAccessToken = (userId: string, roles: string[]) => {
    return jwt.sign({ id: userId, roles: roles }, secretKey, { expiresIn: '30m', algorithm: 'HS256' });
  };
  

