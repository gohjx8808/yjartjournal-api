import { Router } from 'express';
import { AssignableRoles } from '../../entities/Roles';
import JwtAuthMiddleware from '../../middlewares/JwtAuthMiddleware';
import UserExistsMiddleware from '../../middlewares/admin/user/UserExistsMiddleware';
import AddAddressValidator from '../../requestValidators/address/AddAddressValidator';
import UserIdValidator from '../../requestValidators/admin/user/UserIdValidator';
import {
  AdminAddAddressPayload,
  AdminUpdateAddressPayload,
} from '../../services/admin/user/typings';
import AddressServices from '../../services/address/AddressServices';
import AdminAddAddressMiddleware from '../../middlewares/admin/user/address/AdminAddAddressMiddleware';
import UpdateAddressValidator from '../../requestValidators/address/UpdateAddressValidator';
import AdminUpdateAddressMiddleware from '../../middlewares/admin/user/address/AdminUpdateAddressMiddleware';

const userAddressRouter = Router();

const addressServices = new AddressServices();

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

export default userAddressRouter;
