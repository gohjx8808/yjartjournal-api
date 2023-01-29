import { Router } from 'express';
import multer from 'multer';
import signUpMiddleware from '../middlewares/signUpMiddleware';
import { signUpValidator } from '../requestValidators/userValidators';
import { SignUpPayload } from '../services/user/typings';
import { signUpUser } from '../services/user/userServices';

const upload = multer();

export const userRouter = Router();

userRouter.post<{}, any, SignUpPayload>(
  '/sign-up',
  ...[upload.none(), ...signUpValidator, signUpMiddleware()],
  async (req, res) => {
    const payload = req.body;
    const response = await signUpUser(payload);

    res.json(response);
  },
);
