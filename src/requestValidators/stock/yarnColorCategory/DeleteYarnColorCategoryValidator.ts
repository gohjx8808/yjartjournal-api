import { body } from 'express-validator';
import customValidator from '../../customValidator';

const DeleteYarnColorCategoryValidator = customValidator([
  body('id')
    .notEmpty()
    .withMessage('Yarn color category id is required.')
    .isInt()
    .withMessage('Invalid yarn color category id.'),
]);

export default DeleteYarnColorCategoryValidator;
