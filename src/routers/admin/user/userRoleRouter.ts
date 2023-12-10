import { Router } from 'express';
import { AssignableRoles } from '../../../entities/Roles';
import JwtAuthMiddleware from '../../../middlewares/JwtAuthMiddleware';
import UserExistsMiddleware from '../../../middlewares/admin/user/UserExistsMiddleware';
import AssignableRolesMiddleware from '../../../middlewares/admin/user/role/AssignableRolesMiddleware';
import RoleExistsMiddleware from '../../../middlewares/admin/user/role/RoleExistsMiddleware';
import UserRoleExistsMiddleware from '../../../middlewares/admin/user/role/UserRoleExistsMiddleware';
import AddUserRoleValidator from '../../../requestValidators/admin/user/role/AddUserRoleValidator';
import DeleteUserRoleValidator from '../../../requestValidators/admin/user/role/DeleteUserRoleValidator';
import AdminUserServices from '../../../services/admin/user/AdminUserServices';
import {
  AddUserRolePayload,
  DeleteUserRolePayload,
} from '../../../services/admin/user/typings';

const userRoleRouter = Router();

const adminUserServices = new AdminUserServices();

userRoleRouter.post<{}, any, AddUserRolePayload>(
  '/add',
  ...[
    ...AddUserRoleValidator,
    UserExistsMiddleware(),
    RoleExistsMiddleware(),
    AssignableRolesMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const response = await adminUserServices.addRole(req.body);

    return res.json({ data: response });
  },
);

userRoleRouter.post<{}, any, DeleteUserRolePayload>(
  '/delete',
  ...[
    ...DeleteUserRoleValidator,
    UserRoleExistsMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const response = await adminUserServices.deleteRole(req.body);

    return res.json({ data: response });
  },
);

export default userRoleRouter;
