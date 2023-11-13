import { NextFunction, Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { SignUpPayload } from '../services/user/typings';

const UniqueEmailMiddleware =
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
          message: 'Same email exists.',
        });
      }

      next();
    };

export default UniqueEmailMiddleware;
