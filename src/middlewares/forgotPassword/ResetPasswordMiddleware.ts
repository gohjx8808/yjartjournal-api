import { NextFunction, Request, Response } from 'express';
import { getResetPasswordEntryByToken } from '../../repositories/forgotPasswordRepository';
import { ResetPasswordPayload } from '../../services/forgotPassword/typings';

const ResetPasswordMiddleware =
  () =>
    async (
      req: Request<{}, any, ResetPasswordPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;

      const tokenDetails = await getResetPasswordEntryByToken(payload.token);

      if (!tokenDetails) {
        return res.status(404).json({ message: 'Invalid token.' });
      }

      if (tokenDetails.expiredAt < new Date()) {
        return res.status(410).json({
          message: 'The token is expired. Please request for a new token.',
        });
      }

      if (tokenDetails.isUsed) {
        return res.status(410).json({
          message: 'The token is used. Please request for a new token.',
        });
      }

      return next();
    };

export default ResetPasswordMiddleware;
