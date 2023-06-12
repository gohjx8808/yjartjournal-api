import { body } from 'express-validator';
import customValidator from '../customValidator';

const CalculateShippingFeeValidator = customValidator([
  body('state.id')
    .notEmpty()
    .withMessage('State id is required.')
    .isInt()
    .withMessage('Invalid state id.'),
  body('state.name')
    .notEmpty()
    .withMessage('State name is required.')
    .isString()
    .withMessage('Invalid state name.'),
  body('totalAmount')
    .notEmpty()
    .withMessage('Total amount is required.')
    .isFloat()
    .withMessage('Invalid total amount.'),
]);

export default CalculateShippingFeeValidator;
