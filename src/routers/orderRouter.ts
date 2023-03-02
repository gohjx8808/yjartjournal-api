import { Router } from 'express';
import multer from 'multer';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
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
  ...[upload.none(), ...CheckoutValidator],
  async (req, res) => {
    const payload = req.body;

    const response = await checkout(payload);

    return res.json({ data: response });
  },
);
