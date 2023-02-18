import { NextFunction, Request, Response } from 'express';
import { body, oneOf, validationResult } from 'express-validator';

const CheckoutAddressValidator = [
  oneOf([
    [
      body('receiverName')
        .notEmpty()
        .withMessage('Receiver name is required.'),
    ],
    body('addressId')
      .notEmpty()
      .withMessage('Address ID is required.')
      .isInt()
      .withMessage('Invalid address ID'),
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export default CheckoutAddressValidator;
