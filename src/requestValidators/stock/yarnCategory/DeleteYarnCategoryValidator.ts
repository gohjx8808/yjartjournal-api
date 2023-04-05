import { body } from 'express-validator';
import customValidator from '../../customValidator';

const DeleteYarnCategoryValidator = customValidator([
  body('id')
    .notEmpty()
    .withMessage('Yarn category id is required.')
    .isInt()
    .withMessage('Invalid yarn category id.'),
]);

export default DeleteYarnCategoryValidator;
