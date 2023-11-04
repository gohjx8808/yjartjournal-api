import { Response, Router } from 'express';
import multer from 'multer';
import { typeAuthenticatedUser } from '../helpers/sharedHelper';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import UpdateAccountValidator from '../requestValidators/UpdateAccountValidator';
import { UpdateAccountPayload } from '../services/account/typings';
import { CustomAuthenticatedRequest } from '../typings';
import AccountServices from '../services/account/AccountServicesa';

const upload = multer();

const accountRouter = Router();

const accountServices = new AccountServices();

accountRouter.get(
  '/details',
  JwtAuthMiddleware(),
  async (req: CustomAuthenticatedRequest, res: Response) => {
    const user = typeAuthenticatedUser(req);
    const details = await accountServices.getUserAccount(user.id);

    return res.json({ data: details });
  },
);

accountRouter.post(
  '/update',
  ...[upload.none(), ...UpdateAccountValidator, JwtAuthMiddleware()],
  async (req: CustomAuthenticatedRequest<UpdateAccountPayload>, res) => {
    const payload = req.body;
    const user = typeAuthenticatedUser(req);

    const response = await accountServices.updateUserAccount(user.id, payload);

    return res.json(response);
  },
);

export default accountRouter;
