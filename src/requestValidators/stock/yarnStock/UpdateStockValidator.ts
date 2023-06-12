import { body } from 'express-validator';
import customValidator from '../../customValidator';

const UpdateStockValidator = customValidator([
  body('yarnId')
    .notEmpty()
    .withMessage('Yarn id is required.')
    .isInt()
    .withMessage('Invalid yarn id.'),
  body('yarnCategory.id')
    .notEmpty()
    .withMessage('Yarn category id is required.')
    .isInt()
    .withMessage('Invalid yarn category id.'),
  body('yarnCategory.name')
    .notEmpty()
    .withMessage('Yarn category name is required.')
    .isString()
    .withMessage('Invalid yarn category name.'),
  body('yarnColorCategory.id')
    .notEmpty()
    .withMessage('Yarn color category id is required.')
    .isInt()
    .withMessage('Invalid yarn color category id.'),
  body('yarnColorCategory.name')
    .notEmpty()
    .withMessage('Yarn color category name is required.')
    .isString()
    .withMessage('Invalid yarn color category name.'),
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
