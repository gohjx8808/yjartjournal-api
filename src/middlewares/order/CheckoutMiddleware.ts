import { NextFunction, Response } from 'express';
import { CheckoutPayload } from '../../services/order/typings';
import { CustomAuthenticatedRequest } from '../../typings';
import { getPromoCodeById } from '../../repositories/promoCodeRepository';

const CheckoutMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<CheckoutPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = req.user?.valueOf();
      const payload = req.body;

      if (!user && payload.addressId) {
        return res
          .status(401)
          .json({ message: 'You are not allowed to use this address.' });
      }

      const existingPromoCode = await getPromoCodeById(payload.promoCodeUsed.id);

      if (!existingPromoCode) {
        return res.status(404).json({ message: 'Invalid promo code.' });
      }
      next();
    };

export default CheckoutMiddleware;
