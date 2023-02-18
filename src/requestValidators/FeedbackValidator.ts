import { body } from 'express-validator';
import customValidator from './customValidator';

const FeedbackValidator = customValidator([
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isString()
    .withMessage('Invalid name.'),
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Invalid email.'),
  body('feedback').notEmpty().withMessage('Feedback is required.'),
]);

export default FeedbackValidator;
