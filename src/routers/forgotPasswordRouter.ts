import { Router } from 'express';
import multer from 'multer';
import ForgotPasswordMiddleware from '../middlewares/forgotPassword/forgotPasswordMiddleware';
import forgotPasswordValidator from '../requestValidators/forgotPassword/ForgotPasswordValidator';
import { performForgotPasswordOperation } from '../services/forgotPassword/forgotPasswordServices';
import { ForgotPasswordPayload } from '../services/forgotPassword/typings';

const upload = multer();

const forgotPasswordRouter = Router();

forgotPasswordRouter.post<{}, any, ForgotPasswordPayload>(
  '/',
  ...[upload.none(), ...forgotPasswordValidator, ForgotPasswordMiddleware()],
  async (req, res) => {
    const payload = req.body;

    await performForgotPasswordOperation(payload.email);

    return res.json({ message: 'Reset password email sent.' });
  },
);

export default forgotPasswordRouter;
