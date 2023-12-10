import { Router } from 'express';
import { AssignableRoles } from '../../../entities/Roles';
import JwtAuthMiddleware from '../../../middlewares/JwtAuthMiddleware';
import UserExistsMiddleware from '../../../middlewares/admin/user/UserExistsMiddleware';
import AdminAddAddressMiddleware from '../../../middlewares/admin/user/address/AdminAddAddressMiddleware';
import AdminDeleteAddressMiddleware from '../../../middlewares/admin/user/address/AdminDeleteAddressMiddleware';
import AdminUpdateAddressMiddleware from '../../../middlewares/admin/user/address/AdminUpdateAddressMiddleware';
import AddAddressValidator from '../../../requestValidators/address/AddAddressValidator';
import DeleteAddressValidator from '../../../requestValidators/address/DeleteAddressValidator';
import UpdateAddressValidator from '../../../requestValidators/address/UpdateAddressValidator';
import UserIdValidator from '../../../requestValidators/admin/user/UserIdValidator';
import AddressServices from '../../../services/address/AddressServices';
import { DeleteAddressPayload } from '../../../services/address/typings';
import {
  AdminAddAddressPayload,
  AdminUpdateAddressPayload,
} from '../../../services/admin/user/typings';

const userAddressRouter = Router();

const addressServices = new AddressServices();

userAddressRouter.get(
  '/form-options',
  JwtAuthMiddleware(true, [AssignableRoles.ADMIN, AssignableRoles.ADMIN_VIEW]),
  async (_req, res) => {
    const response = await addressServices.getAddressFormOptions();

    return res.json({ data: response });
  },
);

userAddressRouter.post<{}, any, AdminAddAddressPayload>(
  '/add',
  ...[
    ...AddAddressValidator,
    ...UserIdValidator,
    AdminAddAddressMiddleware(),
    UserExistsMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const { userId, ...addressDetails } = req.body;

    const response = await addressServices.addAddress(userId, addressDetails);

    return res.json({ data: response });
  },
);

userAddressRouter.post<{}, any, AdminUpdateAddressPayload>(
  '/update',
  ...[
    ...UpdateAddressValidator,
    ...UserIdValidator,
    AdminUpdateAddressMiddleware(),
    UserExistsMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const { userId, ...addressDetails } = req.body;

    const response = await addressServices.updateAddress(
      userId,
      addressDetails,
    );

    return res.json({ data: response });
  },
);

userAddressRouter.post<{}, any, DeleteAddressPayload>(
  '/delete',
  ...[
    ...DeleteAddressValidator,
    AdminDeleteAddressMiddleware(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
  ],
  async (req, res) => {
    const payload = req.body;

    const response = await addressServices.deleteAddress(payload);

    return res.json({ data: response });
  },
);

export default userAddressRouter;
