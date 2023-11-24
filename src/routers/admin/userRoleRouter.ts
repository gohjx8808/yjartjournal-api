import { Router } from 'express';
import {
  AddUserRolePayload,
  DeleteUserRolePayload,
} from '../../services/admin/user/typings';
import AddUserRoleValidator from '../../requestValidators/admin/user/role/AddUserRoleValidator';
import UserExistsMiddleware from '../../middlewares/admin/user/UserExistsMiddleware';
import RoleExistsMiddleware from '../../middlewares/admin/user/role/RoleExistsMiddleware';
import AssignableRolesMiddleware from '../../middlewares/admin/user/role/AssignableRolesMiddleware';
import JwtAuthMiddleware from '../../middlewares/JwtAuthMiddleware';
import { AssignableRoles } from '../../entities/Roles';
import AdminUserServices from '../../services/admin/user/AdminUserServices';
import DeleteUserRoleValidator from '../../requestValidators/admin/user/role/DeleteUserRoleValidator';
import UserRoleExistsMiddleware from '../../middlewares/admin/user/role/UserRoleExistsMiddleware';

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
