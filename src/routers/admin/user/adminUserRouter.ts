import { Router } from 'express';
import { AssignableRoles } from '../../../entities/Roles';
import JwtAuthMiddleware from '../../../middlewares/JwtAuthMiddleware';
import GetUserListValidator from '../../../requestValidators/admin/user/GetUserListValidator';
import AdminUserServices from '../../../services/admin/user/AdminUserServices';
import { GetUserListPayload } from '../../../services/admin/user/typings';

const adminUserRouter = Router();

const adminUserServices = new AdminUserServices();

adminUserRouter.post<{}, any, GetUserListPayload>(
  '/get-all',
  ...[
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

export default adminUserRouter;
