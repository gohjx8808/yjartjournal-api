import { body } from 'express-validator';
import customValidator from '../customValidator';

const AddNewStockValidator = customValidator([
  body('yarnCategory')
    .notEmpty()
    .withMessage('Yarn category is required.')
    .isObject()
    .withMessage('Invalid yarn category.'),
  body('yarnColorCategory')
    .notEmpty()
    .withMessage('Yarn color category is required.')
    .isObject()
    .withMessage('Invalid yarn color category.'),
  body('detailedColor')
    .notEmpty()
    .withMessage('Detailed color is required.')
    .isString()
    .withMessage('Invalid detailed color.'),
  body('cost')
    .notEmpty()
    .withMessage('Cost is required.')
    .isFloat()
    .withMessage('Invalid cost.'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required.')
    .isInt()
    .withMessage('Invalid quantity.'),
  body('reorderLevel')
    .notEmpty()
    .withMessage('Reorder level is required.')
    .isInt()
    .withMessage('Invalid reorder level.'),
  body('lastOrderedDate')
    .optional()
    .isDate()
    .withMessage('Invalid last ordered date.'),
]);

export default AddNewStockValidator;
