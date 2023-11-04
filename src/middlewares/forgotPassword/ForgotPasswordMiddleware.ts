import { NextFunction, Request, Response } from 'express';
import UserRepository from '../../repositories/UserRepository';
import { ForgotPasswordPayload } from '../../services/forgotPassword/typings';

const ForgotPasswordMiddleware =
  () =>
    async (
      req: Request<{}, any, ForgotPasswordPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const userRepository = new UserRepository();
      const payload = req.body;

      const userDetails = await userRepository.getUserByEmail(payload.email);

      if (userDetails) {
        return next();
      }

      return res
        .status(404)
        .json({ message: 'The email inserted is not in the system.' });
    };

export default ForgotPasswordMiddleware;
