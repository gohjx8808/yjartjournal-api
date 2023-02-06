import { Router } from 'express';
import multer from 'multer';
import { Users } from '../entities/Users';
import AddAddressMiddleware from '../middlewares/address/AddAddressMiddleware';
import DeleteAddressMiddleware from '../middlewares/address/DeleteAddressMiddleware';
import UpdateAddressMiddleware from '../middlewares/address/UpdateAddressMiddleware';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import AddAddressValidator from '../requestValidators/address/AddAddressValidator';
import DeleteAddressValidator from '../requestValidators/address/DeleteAddressValidator';
import UpdateAddressValidator from '../requestValidators/address/UpdateAddressValidator';
import {
  addAddress,
  deleteAddress,
  getAddressList,
  updateAddress,
} from '../services/address/addressServices';
import {
  AddAddressPayload,
  DeleteAddressPayload,
  UpdateAddressPayload,
} from '../services/address/typings';
import { CustomAuthenticatedRequest } from '../typings';

const upload = multer();

export const addressRouter = Router();

addressRouter.get(
  '/list',
  JwtAuthMiddleware(),
  async (req: CustomAuthenticatedRequest, res) => {
    const user = req.user.valueOf() as Users;
    const response = await getAddressList(user);

    return res.json({ data: response });
  },
);

addressRouter.post(
  '/add',
  ...[
    upload.none(),
    JwtAuthMiddleware(),
    ...AddAddressValidator,
    AddAddressMiddleware(),
  ],
  async (req: CustomAuthenticatedRequest<AddAddressPayload>, res) => {
    const user = req.user.valueOf() as Users;
    const payload = req.body;

    const response = await addAddress(user, payload);

    return res.json(response);
  },
);

addressRouter.post(
  '/update',
  ...[
    upload.none(),
    JwtAuthMiddleware(),
    ...UpdateAddressValidator,
    UpdateAddressMiddleware(),
  ],
  async (req: CustomAuthenticatedRequest<UpdateAddressPayload>, res) => {
    const user = req.user.valueOf() as Users;
    const payload = req.body;

    const response = await updateAddress(user, payload);

    return res.json(response);
  },
);

addressRouter.post(
  '/delete',
  ...[
    upload.none(),
    JwtAuthMiddleware(),
    ...DeleteAddressValidator,
    DeleteAddressMiddleware(),
  ],
  async (req: CustomAuthenticatedRequest<DeleteAddressPayload>, res) => {
    const payload = req.body;

    const response = await deleteAddress(payload);

    return res.json(response);
  },
);