import { body } from 'express-validator';
import customValidator from '../../customValidator';

const DeleteYarnStockValidator = customValidator([
  body('yarnStockId')
    .notEmpty()
    .withMessage('Yarn stock id is required.')
    .isInt()
    .withMessage('Invalid yarn stock id.'),
]);

export default DeleteYarnStockValidator;
