import { body } from 'express-validator';
import customValidator from '../../customValidator';

const AddNewYarnColorCategoryValidator = customValidator([
  body('name')
    .notEmpty()
    .withMessage('Yarn color category name is required.')
    .isString()
    .withMessage('Invalid yarn color category name.'),
]);

export default AddNewYarnColorCategoryValidator;
