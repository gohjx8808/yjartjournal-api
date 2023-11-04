import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepositorya';
import { SignUpPayload } from '../services/user/typings';

const SignUpMiddleware =
  () =>
    async (
      req: Request<{}, any, SignUpPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const userRepository = new UserRepository();
      const payload = req.body;

      const userExist = await userRepository.getUserByEmail(payload.email);

      if (userExist) {
        return res.status(422).json({
          message:
          'The provided email is already in use by an existing user. ' +
          'Please register using another email or login using the correct credentials.',
        });
      }

      next();
    };

export default SignUpMiddleware;
