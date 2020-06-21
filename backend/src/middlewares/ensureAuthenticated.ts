import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth.config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validação do tokenjwt
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  // Bearer klsjdskaTOKEN
  // Aqui é feita uma destruturação com isto a primeira posição não é necessária
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new Error('Invalid jwt Token');
  }
}
