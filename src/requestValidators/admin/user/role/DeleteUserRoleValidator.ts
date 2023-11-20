import { body } from 'express-validator';
import customValidator from '../../../customValidator';

export default customValidator([
  body('userRoleId')
    .notEmpty()
    .withMessage('User role id is required.')
    .isInt()
    .withMessage('Invalid user role id.'),
]);
