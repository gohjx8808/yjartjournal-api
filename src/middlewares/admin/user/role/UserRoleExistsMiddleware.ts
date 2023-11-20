import { NextFunction, Request, Response } from 'express';
import UserRolesRepository from '../../../../repositories/UserRolesRepository';
import { DeleteUserRolePayload } from '../../../../services/admin/user/typings';

const UserRoleExistsMiddleware =
  () =>
    async (
      req: Request<{}, any, DeleteUserRolePayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const userRolesRepository = new UserRolesRepository();

      const userRoleExist = await userRolesRepository.existByUserRoleId(
        payload.userRoleId,
      );

      if (!userRoleExist) {
        return res.status(404).json({ message: 'User role not exists.' });
      }

      next();
    };

export default UserRoleExistsMiddleware;
