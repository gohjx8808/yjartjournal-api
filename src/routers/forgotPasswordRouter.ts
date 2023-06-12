import { Router } from 'express';
import multer from 'multer';
import ForgotPasswordMiddleware from '../middlewares/forgotPassword/ForgotPasswordMiddleware';
import ResetPasswordMiddleware from '../middlewares/forgotPassword/ResetPasswordMiddleware';
import ForgotPasswordValidator from '../requestValidators/forgotPassword/ForgotPasswordValidator';
import ResetPasswordValidator from '../requestValidators/forgotPassword/ResetPasswordValidator';
import {
  performForgotPasswordOperation,
  resetUserPassword,
} from '../services/forgotPassword/forgotPasswordServices';
import {
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from '../services/forgotPassword/typings';

const upload = multer();

const forgotPasswordRouter = Router();

forgotPasswordRouter.post<{}, any, ForgotPasswordPayload>(
  '/',
  ...[upload.none(), ...ForgotPasswordValidator, ForgotPasswordMiddleware()],
  async (req, res) => {
    const payload = req.body;

    await performForgotPasswordOperation(payload.email);

    return res.json({ message: 'Reset password email sent.' });
  },
);

forgotPasswordRouter.post<{}, any, ResetPasswordPayload>(
  '/reset-password',
  ...[upload.none(), ...ResetPasswordValidator, ResetPasswordMiddleware()],
  async (req, res) => {
    const payload = req.body;

    await resetUserPassword(payload);

    return res.json({
      message:
        'Your password had been reset. Please login using your new password.',
    });
  },
);

export default forgotPasswordRouter;
