import { NextFunction, Request, Response } from 'express';
import RoleRepository from '../../../../repositories/RoleRepository';
import { RoleIdPayload } from '../../../../services/admin/user/typings';

const RoleExistsMiddleware =
  () =>
    async (
      req: Request<{}, any, RoleIdPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const rolesRepository = new RoleRepository();

      const roleExist = await rolesRepository.findById(payload.roleId);

      if (!roleExist) {
        return res.status(404).json({ message: 'Role not exists.' });
      }

      next();
    };

export default RoleExistsMiddleware;
