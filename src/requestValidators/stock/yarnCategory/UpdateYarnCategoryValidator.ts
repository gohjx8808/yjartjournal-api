import { body } from 'express-validator';
import customValidator from '../../customValidator';

const UpdateYarnCategoryValidator = customValidator([
  body('id')
    .notEmpty()
    .withMessage('Yarn category id is required.')
    .isInt()
    .withMessage('Invalid yarn category id.'),
  body('name')
    .notEmpty()
    .withMessage('Yarn category name is required.')
    .isString()
    .withMessage('Invalid yarn category name.'),
]);

export default UpdateYarnCategoryValidator;
