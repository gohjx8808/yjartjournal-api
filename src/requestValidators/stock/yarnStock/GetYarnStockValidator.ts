import { body } from 'express-validator';
import customValidator from '../../customValidator';

const GetYarnStockValidator = customValidator([
  body('yarnCategoryIds').isArray().withMessage('Invalid yarn category ids.'),
  body('yarnCategoryIds.*')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Invalid yarn category id.'),
  body('yarnColorCategoryIds')
    .isArray()
    .withMessage('Invalid yarn color category ids.'),
  body('yarnColorCategoryIds.*')
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Invalid yarn color category id.'),
]);

export default GetYarnStockValidator;
