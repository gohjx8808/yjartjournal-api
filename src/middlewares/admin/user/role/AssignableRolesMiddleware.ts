import { NextFunction, Request, Response } from 'express';
import AdminUserServices from '../../../../services/admin/user/AdminUserServices';
import { AddUserRolePayload } from '../../../../services/admin/user/typings';

const AssignableRolesMiddleware =
  () =>
    async (
      req: Request<{}, any, AddUserRolePayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const adminUserServices = new AdminUserServices();

      const assignableRoles = await adminUserServices.getAssignableRoles(payload);

      if (
        assignableRoles.length === 0 ||
      !assignableRoles.find((role) => role.id === payload.roleId)
      ) {
        return res.status(422).json({ message: 'Role assigned.' });
      }

      next();
    };

export default AssignableRolesMiddleware;
