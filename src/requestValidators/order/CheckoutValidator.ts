import { body } from 'express-validator';
import customValidator from '../customValidator';

const CheckoutValidator = customValidator([
  body('products.*')
    .notEmpty()
    .withMessage('At least one product is required.'),
  body('products.*.id').notEmpty().withMessage('Product ID is required.'),
  body('products.*.name').notEmpty().withMessage('Product name is required.'),
  body('products.*.quantity')
    .notEmpty()
    .withMessage('Product quantity is required.')
    .isInt()
    .withMessage('Invalid product quantity'),
  body('products.*.totalPrice')
    .notEmpty()
    .withMessage('Total price of product is required.')
    .isFloat()
    .withMessage('Invalid total price of product'),
]);

export default CheckoutValidator;
