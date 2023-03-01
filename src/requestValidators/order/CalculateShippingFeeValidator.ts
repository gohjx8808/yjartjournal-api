import { body } from 'express-validator';
import customValidator from '../customValidator';

const CalculateShippingFeeValidator = customValidator([
  body('state')
    .notEmpty()
    .withMessage('State is required.')
    .isObject()
    .withMessage('Invalid state.'),
  body('totalAmount')
    .notEmpty()
    .withMessage('Total amount is required.')
    .isFloat()
    .withMessage('Invalid total amount.'),
]);

export default CalculateShippingFeeValidator;
