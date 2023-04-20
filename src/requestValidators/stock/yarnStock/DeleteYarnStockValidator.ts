import { body } from 'express-validator';
import customValidator from '../../customValidator';

const DeleteYarnStockValidator = customValidator([
  body('yarnId')
    .notEmpty()
    .withMessage('Yarn id is required.')
    .isInt()
    .withMessage('Invalid yarn id.'),
]);

export default DeleteYarnStockValidator;
