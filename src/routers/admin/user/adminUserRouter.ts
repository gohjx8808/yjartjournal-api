import { Router } from 'express';
import multer from 'multer';
import { AssignableRoles } from '../../../entities/Roles';
import JwtAuthMiddleware from '../../../middlewares/JwtAuthMiddleware';
import UniqueEmailMiddleware from '../../../middlewares/UniqueEmailMiddleware';
import UserExistsMiddleware from '../../../middlewares/admin/user/UserExistsMiddleware';
import AddNewUserValidator from '../../../requestValidators/admin/user/AddNewUserValidator';
import GetUserListValidator from '../../../requestValidators/admin/user/GetUserListValidator';
import UpdateUserValidator from '../../../requestValidators/admin/user/UpdateUserValidator';
import AdminUserServices from '../../../services/admin/user/AdminUserServices';
import {
  AddNewUserPayload,
  DeleteUserPayload,
  GetUserListPayload,
  UpdateUserPayload,
} from '../../../services/admin/user/typings';
import DeleteUserValidator from '../../../requestValidators/admin/user/DeleteUserValidator';
import DeleteUserMiddleware from '../../../middlewares/admin/user/DeleteUserMiddleware';

const adminUserRouter = Router();

const upload = multer();

const adminUserServices = new AdminUserServices();

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
    ...DeleteUserValidator,
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

export default adminUserRouter;
