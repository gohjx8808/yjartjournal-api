import { Router } from 'express';
import multer from 'multer';
import { AssignableRoles } from '../../../entities/Roles';
import JwtAuthMiddleware from '../../../middlewares/JwtAuthMiddleware';
import UniqueEmailMiddleware from '../../../middlewares/UniqueEmailMiddleware';
import DeleteUserMiddleware from '../../../middlewares/admin/user/DeleteUserMiddleware';
import UserExistsMiddleware from '../../../middlewares/admin/user/UserExistsMiddleware';
import AssignableRolesMiddleware from '../../../middlewares/admin/user/role/AssignableRolesMiddleware';
import RoleExistsMiddleware from '../../../middlewares/admin/user/role/RoleExistsMiddleware';
import UserRoleExistsMiddleware from '../../../middlewares/admin/user/role/UserRoleExistsMiddleware';
import AddNewUserValidator from '../../../requestValidators/admin/user/AddNewUserValidator';
import GetUserListValidator from '../../../requestValidators/admin/user/GetUserListValidator';
import UpdateUserValidator from '../../../requestValidators/admin/user/UpdateUserValidator';
import UserIdValidator from '../../../requestValidators/admin/user/UserIdValidator';
import AddUserRoleValidator from '../../../requestValidators/admin/user/role/AddUserRoleValidator';
import DeleteUserRoleValidator from '../../../requestValidators/admin/user/role/DeleteUserRoleValidator';
import AddressServices from '../../../services/address/AddressServices';
import AdminUserServices from '../../../services/admin/user/AdminUserServices';
import {
  AddNewUserPayload,
  AddUserRolePayload,
  DeleteUserPayload,
  DeleteUserRolePayload,
  GetUserListPayload,
  UpdateUserPayload,
  UserIdPayload,
} from '../../../services/admin/user/typings';
import UserRoleServices from '../../../services/userRole/UserRoleServices';

const adminUserRouter = Router();

const upload = multer();

const adminUserServices = new AdminUserServices();
const userRoleServices = new UserRoleServices();
const addressServices = new AddressServices();

adminUserRouter.post<{}, any, GetUserListPayload>(
  '/get-all',
  ...[
    upload.none(),
    ...GetUserListValidator,
    JwtAuthMiddleware(true, [
      AssignableRoles.ADMIN,
      AssignableRoles.ADMIN_VIEW,
    ]),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.getAll(payload);

    return res.json({ data: response });
  },
);

adminUserRouter.post<{}, any, UserIdPayload>(
  '/roles',
  ...[
    ...UserIdValidator,
    JwtAuthMiddleware(true, [
      AssignableRoles.ADMIN,
      AssignableRoles.ADMIN_VIEW,
    ]),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await userRoleServices.getById(payload.userId);

    return res.json({ data: response });
  },
);

adminUserRouter.post<{}, any, UserIdPayload>(
  '/addresses',
  ...[
    ...UserIdValidator,
    JwtAuthMiddleware(true, [
      AssignableRoles.ADMIN,
      AssignableRoles.ADMIN_VIEW,
    ]),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await addressServices.getAddressList(payload.userId);

    return res.json({ data: response });
  },
);

adminUserRouter.post<{}, any, AddNewUserPayload>(
  '/add-new',
  ...[
    upload.none(),
    ...AddNewUserValidator,
    UniqueEmailMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.addNew(payload);

    return res.json({ data: response });
  },
);

adminUserRouter.post<{}, any, UpdateUserPayload>(
  '/update',
  ...[
    upload.none(),
    ...UpdateUserValidator,
    UserExistsMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.update(payload);

    return res.json({ data: response });
  },
);

adminUserRouter.post<{}, any, DeleteUserPayload>(
  '/delete',
  ...[
    upload.none(),
    ...UserIdValidator,
    UserExistsMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    DeleteUserMiddleware(),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.delete(payload);

    return res.json({ data: response });
  },
);

adminUserRouter.get(
  '/form-options',
  JwtAuthMiddleware(true, [AssignableRoles.ADMIN_VIEW, AssignableRoles.ADMIN]),
  async (req, res) => {
    const response = await adminUserServices.getFormOptions();

    return res.json({ data: response });
  },
);

adminUserRouter.post<{}, any, AddUserRolePayload>(
  '/role/add',
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

adminUserRouter.post<{}, any, DeleteUserRolePayload>(
  '/role/delete',
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

adminUserRouter.post<{}, any, UserIdPayload>(
  '/assignable-roles',
  ...[
    ...UserIdValidator,
    UserExistsMiddleware(),
    JwtAuthMiddleware(true, [
      AssignableRoles.ADMIN,
      AssignableRoles.ADMIN_VIEW,
    ]),
  ],
  async (req, res) => {
    const response = await adminUserServices.getAssignableRoles(req.body);

    return res.json({ data: response });
  },
);

export default adminUserRouter;
