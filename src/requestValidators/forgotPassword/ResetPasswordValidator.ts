import { body } from 'express-validator';
import customValidator from '../customValidator';

const ResetPasswordValidator = customValidator([
  body('token').notEmpty().withMessage('Token is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
]);

export default ResetPasswordValidator;
