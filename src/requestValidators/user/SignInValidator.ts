import { body } from 'express-validator';
import customValidator from '../customValidator';

const SignInValidator = customValidator([
  body('email').notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required').bail(),
]);

export default SignInValidator;