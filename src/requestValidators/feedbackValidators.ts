import { body } from 'express-validator';
import customValidator from './customValidator';

export const submitFeedbackValidator = customValidator([
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .bail()
    .isString()
    .withMessage('Invalid name')
    .bail(),
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .isEmail()
    .withMessage('Invalid email')
    .bail(),
  body('feedback').notEmpty().withMessage('Feedback is required.').bail(),
]);
