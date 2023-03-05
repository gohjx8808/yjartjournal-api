import { Response, Router } from 'express';
import multer from 'multer';
import Users from '../entities/Users';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import UpdateAccountValidator from '../requestValidators/UpdateAccountValidator';
import {
  getUserAccount,
  updateUserAccount,
} from '../services/account/accountServices';
import { UpdateAccountPayload } from '../services/account/typings';
import { CustomAuthenticatedRequest } from '../typings';

const upload = multer();

export const accountRouter = Router();

accountRouter.get(
  '/details',
  JwtAuthMiddleware(),
  async (req: CustomAuthenticatedRequest, res: Response) => {
    const user = req.user.valueOf() as Users;
    const details = await getUserAccount(user.id);

    return res.json({ data: details });
  },
);

accountRouter.post(
  '/update',
  ...[upload.none(), ...UpdateAccountValidator, JwtAuthMiddleware()],
  async (req: CustomAuthenticatedRequest<UpdateAccountPayload>, res) => {
    const payload = req.body;
    const user = req.user.valueOf() as Users;

    const response = await updateUserAccount(user.id, payload);

    return res.json(response);
  },
);
