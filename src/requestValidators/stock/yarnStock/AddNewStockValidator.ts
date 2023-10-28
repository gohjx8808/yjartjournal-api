import { body } from 'express-validator';
import customValidator from '../../customValidator';

const AddNewStockValidator = customValidator([
  body('yarnCategoryId')
    .notEmpty()
    .withMessage('Yarn category id is required.')
    .isInt()
    .withMessage('Invalid yarn category id.'),
  body('yarnColorCategoryId')
    .notEmpty()
    .withMessage('Yarn color category id is required.')
    .isInt()
    .withMessage('Invalid yarn color category id.'),
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isString()
    .withMessage('Invalid name.'),
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
    .optional({ nullable: true })
    .isISO8601()
    .toDate()
    .withMessage('Invalid last ordered date.'),
  body('image').optional({ nullable: true }),
]);

export default AddNewStockValidator;
