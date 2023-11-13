import { Router } from 'express';
import multer from 'multer';
import SignInMiddleware from '../middlewares/SignInMiddleware';
import UniqueEmailMiddleware from '../middlewares/UniqueEmailMiddleware';
import SignInValidator from '../requestValidators/user/SignInValidator';
import SignUpValidator from '../requestValidators/user/SignUpValidator';
import UserServices from '../services/user/UserServices';
import { SignInPayload, SignUpPayload } from '../services/user/typings';

const upload = multer();

const userRouter = Router();

const userServices = new UserServices();

userRouter.post<{}, any, SignUpPayload>(
  '/sign-up',
  ...[upload.none(), ...SignUpValidator, UniqueEmailMiddleware()],
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

export default userRouter;
