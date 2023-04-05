import { body } from 'express-validator';
import customValidator from '../customValidator';

const SignInValidator = customValidator([
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required'),
]);

export default SignInValidator;
