import { body } from 'express-validator';
import customValidator from '../../customValidator';

const UpdateStockValidator = customValidator([
  body('yarnId')
    .notEmpty()
    .withMessage('Yarn id is required.')
    .isInt()
    .withMessage('Invalid yarn id.'),
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
  body('quantity').isEmpty().withMessage('Quantity should be empty.'),
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
  body('image.base64Data')
    .optional({ nullable: true })
    .isString()
    .withMessage('Invalid base64 data.'),
  body('image.isUpdated')
    .notEmpty()
    .withMessage('Is updated is required.')
    .isBoolean()
    .withMessage('Invalid value.'),
]);

export default UpdateStockValidator;
