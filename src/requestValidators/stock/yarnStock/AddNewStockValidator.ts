import { body } from 'express-validator';
import customValidator from '../../customValidator';

const AddNewStockValidator = customValidator([
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
    .isISO8601()
    .toDate()
    .withMessage('Invalid last ordered date.'),
  body('image')
    .optional({ nullable: true })
    .matches(/data:image\/png;base64,/),
]);

export default AddNewStockValidator;
