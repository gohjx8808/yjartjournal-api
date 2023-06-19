import { body } from 'express-validator';
import customValidator from '../customValidator';

const SignInValidator = customValidator([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isInt()
    .withMessage('Invalid role'),
]);

export default SignInValidator;
