import { Router } from 'express';
import multer from 'multer';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import VerifyPromoCodeMiddleware from '../middlewares/order/VerifyPromoCodeMiddleware';
import CheckoutValidator from '../requestValidators/order/CheckoutValidator';
import VerifyPromoCodeValidator from '../requestValidators/order/VerifyPromoCodeValidator';
import { checkout, getPromoCodeByName } from '../services/order/orderServices';
import {
  CheckoutPayload,
  VerifyPromoCodePayload,
} from '../services/order/typings';

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

orderRouter.post<{}, any, CheckoutPayload>(
  '/checkout',
  ...[upload.none(), ...CheckoutValidator],
  (req, res) => {
    const payload = req.body;

    checkout(payload);
  },
);
