import { Router } from 'express';
import multer from 'multer';
import CheckoutAddressValidator from '../requestValidators/order/CheckoutAddressValidator';
import CheckoutValidator from '../requestValidators/order/CheckoutValidator';
import { checkout } from '../services/order/orderServices';
import { CheckoutPayload } from '../services/order/typings';

const upload = multer();

export const orderRouter = Router();

orderRouter.post<{}, any, CheckoutPayload>(
  '/checkout',
  ...[upload.none(), ...CheckoutValidator, ...CheckoutAddressValidator],
  (req, res) => {
    const payload = req.body;

    checkout(payload);
  },
);
