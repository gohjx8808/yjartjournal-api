import { Router } from 'express';
import { AssignableRoles } from '../../../entities/Roles';
import JwtAuthMiddleware from '../../../middlewares/JwtAuthMiddleware';
import GetUserListValidator from '../../../requestValidators/admin/user/GetUserListValidator';
import AdminUserServices from '../../../services/admin/user/AdminUserServices';
import {
  AddNewUserPayload,
  GetUserListPayload,
  UpdateUserPayload,
} from '../../../services/admin/user/typings';
import AddNewUserValidator from '../../../requestValidators/admin/user/AddNewUserValidator';
import UniqueEmailMiddleware from '../../../middlewares/UniqueEmailMiddleware';
import UpdateUserValidator from '../../../requestValidators/admin/user/UpdateUserValidator';
import UpdateUserMiddleware from '../../../middlewares/admin/user/UpdateUserMiddleware';
import multer from 'multer';

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
    UpdateUserMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.update(payload);

    return res.json({ data: response });
  },
);

export default adminUserRouter;
