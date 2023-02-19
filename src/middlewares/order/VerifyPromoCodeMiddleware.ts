import { NextFunction, Response } from 'express';
import { Users } from '../../entities/Users';
import { VerifyPromoCodePayload } from '../../services/order/typings';
import {
  getPromoCodeByName,
  validatePromoCode,
} from '../../services/promoCode/promoCodeServices';
import { CustomAuthenticatedRequest } from '../../typings';

const VerifyPromoCodeMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<VerifyPromoCodePayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const user = req.user.valueOf() as Users;

      const existingPromoCode = await getPromoCodeByName(payload.promoCode);

      const verificationResult = await validatePromoCode(existingPromoCode, user);

      if (!verificationResult.success) {
        return res.status(422).json({ message: verificationResult.message });
      }

      next();
    };

export default VerifyPromoCodeMiddleware;
