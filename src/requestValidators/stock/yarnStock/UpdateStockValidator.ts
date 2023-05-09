import { body } from 'express-validator';
import customValidator from '../../customValidator';

const UpdateStockValidator = customValidator([
  body('yarnId')
    .notEmpty()
    .withMessage('Yarn id is required.')
    .isInt()
    .withMessage('Invalid yarn id.'),
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
  body('quantity').isEmpty().withMessage('Quantity should be empty.'),
  body('reorderLevel')
    .notEmpty()
    .withMessage('Reorder level is required.')
    .isInt()
    .withMessage('Invalid reorder level.'),
  body('lastOrderedDate')
    .optional()
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
