import { body } from 'express-validator';
import customValidator from './customValidator';

export const signUpValidator = customValidator([
  body('name').notEmpty().withMessage('Name is required.').bail(),
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .bail()
    .isEmail()
    .withMessage('Invalid email.')
    .bail(),
  body('password').notEmpty().withMessage('Password is required.').bail(),
  body('countryCode')
    .notEmpty()
    .withMessage('Country code is required.')
    .bail()
    .isInt()
    .withMessage('Invalid country code.')
    .bail(),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required.')
    .bail()
    .isInt()
    .withMessage('Invalid phone number.')
    .bail(),
  body('gender')
    .notEmpty()
    .withMessage('Gender is required.')
    .bail()
    .matches(/^[FM]$/)
    .withMessage('Invalid gender.'),
  body('dob')
    .notEmpty()
    .withMessage('Date of birth is required.')
    .bail()
    .isDate({ format: 'DD/MM/YYYY' })
    .withMessage('Invalid date of birth.')
    .bail(),
]);
