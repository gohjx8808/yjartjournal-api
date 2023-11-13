import { NextFunction, Request, Response } from 'express';
import { UpdateUserPayload } from '../../../services/admin/user/typings';
import UserRepository from '../../../repositories/UserRepository';

const UpdateUserMiddleware =
  () =>
    async (
      req: Request<{}, any, UpdateUserPayload>,
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

export default UpdateUserMiddleware;
