import { NextFunction, Response } from 'express';
import { CheckoutPayload } from '../../services/order/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const CheckoutMiddleware =
  () =>
    (
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

      next();
    };

export default CheckoutMiddleware;
