import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import Auth from '@config/Auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT toke is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, Auth.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }

  return next();
}