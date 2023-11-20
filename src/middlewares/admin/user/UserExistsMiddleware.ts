import { NextFunction, Request, Response } from 'express';
import UserRepository from '../../../repositories/UserRepository';
import { UserIdPayload } from '../../../services/admin/user/typings';

const UserExistsMiddleware =
  () =>
    async (
      req: Request<{}, any, UserIdPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const userRepository = new UserRepository();

      const userExist = await userRepository.getUserById(payload.userId);

      if (!userExist) {
        return res.status(404).json({ message: 'User not exists.' });
      }

      next();
    };

export default UserExistsMiddleware;
