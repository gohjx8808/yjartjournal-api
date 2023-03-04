import { Router } from 'express';
import multer from 'multer';
import { Users } from '../entities/Users';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import CheckoutMiddleware from '../middlewares/order/CheckoutMiddleware';
import VerifyPromoCodeMiddleware from '../middlewares/order/VerifyPromoCodeMiddleware';
import CalculateShippingFeeValidator from '../requestValidators/order/CalculateShippingFeeValidator';
import CheckoutValidator from '../requestValidators/order/CheckoutValidator';
import VerifyPromoCodeValidator from '../requestValidators/order/VerifyPromoCodeValidator';
import {
  calculateShippingFee,
  checkout,
} from '../services/order/orderServices';
import {
  CalculateShippingFeePayload,
  CheckoutPayload,
  VerifyPromoCodePayload,
} from '../services/order/typings';
import { getPromoCodeByName } from '../services/promoCode/promoCodeServices';
import { CustomAuthenticatedRequest } from '../typings';

const upload = multer();

export const orderRouter = Router();

orderRouter.post<{}, any, VerifyPromoCodePayload>(
  '/verify-promo-code',
  ...[
    upload.none(),
    JwtAuthMiddleware(),
    ...VerifyPromoCodeValidator,
    VerifyPromoCodeMiddleware(),
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await getPromoCodeByName(payload.promoCode);

    return res.json({ response });
  },
);

orderRouter.post<{}, any, CalculateShippingFeePayload>(
  '/calculate-shipping-fee',
  ...[upload.none(), ...CalculateShippingFeeValidator],
  (req, res) => {
    const payload = req.body;

    const response = calculateShippingFee(payload);

    return res.json({ data: { shippingFee: response } });
  },
);

orderRouter.post<{}, any, CheckoutPayload>(
  '/checkout',
  ...[
    upload.none(),
    JwtAuthMiddleware(false),
    ...CheckoutValidator,
    CheckoutMiddleware(),
  ],
  async (req: CustomAuthenticatedRequest<CheckoutPayload>, res) => {
    const payload = req.body;
    const user = req.user?.valueOf() as Users;

    const response = await checkout(payload, user);

    return res.json({ data: response });
  },
);
