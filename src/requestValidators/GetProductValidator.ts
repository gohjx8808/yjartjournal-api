import { body } from 'express-validator';
import customValidator from './customValidator';

const GetProductValidator = customValidator([
  body('sortId')
    .notEmpty()
    .withMessage('Sort ID is required.')
    .isInt({ min: 1, max: 4 })
    .withMessage('Invalid sort ID.'),
  body('search')
    .optional({ nullable: true })
    .isString()
    .withMessage('Invalid search.'),
]);

export default GetProductValidator;
