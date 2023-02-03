import { Response, Router } from 'express';
import { Users } from '../entities/Users';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import { getUserAccount } from '../services/account/accountServices';
import { CustomAccountRequest } from '../services/account/typings';

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
