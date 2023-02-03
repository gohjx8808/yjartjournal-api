import { Response, Router } from 'express';
import multer from 'multer';
import { Users } from '../entities/Users';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import UpdateAccountValidator from '../requestValidators/UpdateAccountValidator';
import {
  getUserAccount,
  updateUserAccount,
} from '../services/account/accountServices';
import {
  CustomAccountRequest,
  UpdateAccountPayload,
} from '../services/account/typings';

const upload = multer();

export const accountRouter = Router();

accountRouter.get(
  '/details',
  JwtAuthMiddleware(),
  async (req: CustomAccountRequest, res: Response) => {
    const user = req.user.valueOf() as Users;
    const details = await getUserAccount(user.id);

    return res.json({ data: details });
  },
);

accountRouter.post(
  '/update',
  ...[upload.none(), ...UpdateAccountValidator, JwtAuthMiddleware()],
  async (req: CustomAccountRequest<UpdateAccountPayload>, res) => {
    const payload = req.body;
    const user = req.user.valueOf() as Users;

    const response = await updateUserAccount(user.id, payload);

    res.json(response);
  },
);
