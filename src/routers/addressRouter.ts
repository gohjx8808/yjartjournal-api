import { Router } from 'express';
import multer from 'multer';
import { Users } from '../entities/Users';
import AddAddressMiddleware from '../middlewares/AddAddressMiddleware';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import AddAddressValidator from '../requestValidators/address/AddAddressValidator';
import { addAddress } from '../services/address/addressServices';
import { AddAddressPayload } from '../services/address/typings';
import { CustomAuthenticatedRequest } from '../typings';

const upload = multer();

export const addressRouter = Router();

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
