import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomAuthenticatedRequest } from '../typings';

const JwtAuthMiddleware =
  () => (req: CustomAuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];

      verify(token, process.env.JWT_SIGN_TOKEN, (err, user) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized!' });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
  };

export default JwtAuthMiddleware;