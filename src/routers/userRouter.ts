import { Router } from 'express';
import multer from 'multer';
import SignInMiddleware from '../middlewares/SignInMiddleware';
import SignUpMiddleware from '../middlewares/SignUpMiddleware';
import SignInValidator from '../requestValidators/user/SignInValidator';
import SignUpValidator from '../requestValidators/user/SignUpValidator';
import UserServices from '../services/user/UserServices';
import {
  GetUserListPayload,
  SignInPayload,
  SignUpPayload,
} from '../services/user/typings';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import { AssignableRoles } from '../entities/Roles';
import GetUserListValidator from '../requestValidators/user/GetUserListValidator';

const upload = multer();

const userRouter = Router();

const userServices = new UserServices();

userRouter.post<{}, any, SignUpPayload>(
  '/sign-up',
  ...[upload.none(), ...SignUpValidator, SignUpMiddleware()],
  async (req, res) => {
    const payload = req.body;
    const response = await userServices.signUpUser(payload);

    return res.json(response);
  },
);

userRouter.post<{}, any, SignInPayload>(
  '/sign-in',
  ...[upload.none(), ...SignInValidator, SignInMiddleware()],
  async (req, res) => {
    const payload = req.body;

    const response = await userServices.generateAccessToken(payload);

    return res.json({ data: response });
  },
);

userRouter.post<{}, any, GetUserListPayload>(
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
    const response = await userServices.getAll(payload);

    return res.json({ data: response });
  },
);

export default userRouter;
