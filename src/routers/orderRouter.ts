import { Router } from 'express';
import multer from 'multer';
import { typeAuthenticatedUser } from '../helpers/sharedHelper';
import JwtAuthMiddleware from '../middlewares/JwtAuthMiddleware';
import CheckoutMiddleware from '../middlewares/order/CheckoutMiddleware';
import VerifyPromoCodeMiddleware from '../middlewares/order/VerifyPromoCodeMiddleware';
import CalculateShippingFeeValidator from '../requestValidators/order/CalculateShippingFeeValidator';
import CheckoutValidator from '../requestValidators/order/CheckoutValidator';
import VerifyPromoCodeValidator from '../requestValidators/order/VerifyPromoCodeValidator';
import OrderServices from '../services/order/OrderServices';
import {
  CalculateShippingFeePayload,
  CheckoutPayload,
  VerifyPromoCodePayload,
} from '../services/order/typings';
import { CustomAuthenticatedRequest } from '../typings';
import PromoCodeServices from '../services/promoCode/PromoCodeServices';

const upload = multer();

const orderRouter = Router();

const orderServices = new OrderServices();
const promoCodeServices = new PromoCodeServices();

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
    const response = await promoCodeServices.getByName(payload.promoCode);

    return res.json({ data: response });
  },
);

orderRouter.post<{}, any, CalculateShippingFeePayload>(
  '/calculate-shipping-fee',
  ...[upload.none(), ...CalculateShippingFeeValidator],
  (req, res) => {
    const payload = req.body;

    const response = orderServices.calculateShippingFee(payload);

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
    const user = typeAuthenticatedUser(req);

    const response = await orderServices.checkout(payload, user);

    return res.json({ data: response });
  },
);

export default orderRouter;
