import { body } from 'express-validator';
import customValidator from '../../../customValidator';

export default customValidator([
  body('userId')
    .notEmpty()
    .withMessage('User id is required.')
    .isInt()
    .withMessage('Invalid user id.'),
  body('roleId')
    .notEmpty()
    .withMessage('Role id is required.')
    .isInt()
    .withMessage('Invalid role id.'),
]);
