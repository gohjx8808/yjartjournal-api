import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomAuthenticatedRequest } from '../typings';

const handleError = (required: boolean, next: NextFunction, res: Response) => {
  if (required) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
  next();
};

const JwtAuthMiddleware =
  (required = true) =>
    (req: CustomAuthenticatedRequest, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];

        verify(token, process.env.JWT_SIGN_TOKEN, (err, user) => {
          if (err) {
            handleError(required, next, res);
          }
          req.user = user;
          next();
        });
      } else {
        handleError(required, next, res);
      }
    };

export default JwtAuthMiddleware;
