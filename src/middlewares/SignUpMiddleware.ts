import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../dataSource';
import { SignUpPayload } from '../services/user/typings';

const SignUpMiddleware =
  () =>
    async (
      req: Request<{}, any, SignUpPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;

      const userExist = await userRepository
        .createQueryBuilder()
        .where('email = :email', { email: payload.email })
        .getExists();

      if (userExist) {
        return res.status(422).json({ message: 'User exist' });
      }

      next();
    };

export default SignUpMiddleware;
