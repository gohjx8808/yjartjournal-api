import { body } from 'express-validator';
import customValidator from './customValidator';

export const allProductsValidator = customValidator([
  body('sortId')
    .notEmpty()
    .withMessage('Sort ID is required')
    .bail()
    .isInt({ min: 1, max: 4 })
    .withMessage('Invalid sort ID'),
  body('search').optional().isString().withMessage('Invalid search'),
]);
