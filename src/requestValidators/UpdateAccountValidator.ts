import { body } from 'express-validator';
import customValidator from './customValidator';

const UpdateAccountValidator = customValidator([
  body('name').notEmpty().withMessage('Name is required.'),
  body('preferredName')
    .optional({ nullable: true })
    .isString()
    .withMessage('Invalid preferred name.'),
  body('email').isEmpty().withMessage('Email should not be updated.'),
  body('countryCode')
    .notEmpty()
    .withMessage('Country code is required.')
    .isInt()
    .withMessage('Invalid country code.'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required.')
    .isInt()
    .withMessage('Invalid phone number.'),
  body('gender')
    .notEmpty()
    .withMessage('Gender is required.')
    .matches(/^[FM]$/)
    .withMessage('Invalid gender.'),
  body('dob')
    .notEmpty()
    .withMessage('Date of birth is required.')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Invalid date of birth.'),
]);

export default UpdateAccountValidator;
