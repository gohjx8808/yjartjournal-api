import { body } from 'express-validator';
import customValidator from '../customValidator';

const AddUpdateAddressValidator = customValidator([
  body('receiverName')
    .notEmpty()
    .withMessage('Receiver name is required.')
    .bail()
    .isString()
    .withMessage('Invalid receiver name.'),
  body('receiverCountryCode')
    .notEmpty()
    .withMessage('Receiver country code is required.')
    .bail()
    .isInt()
    .withMessage('Invalid receiver country code.'),
  body('receiverPhoneNumber')
    .notEmpty()
    .withMessage('Receiver phone number is required.')
    .bail()
    .isInt()
    .withMessage('Invalid receiver phone number.'),
  body('addressLineOne')
    .notEmpty()
    .withMessage('Address line one is required.')
    .bail()
    .isString()
    .withMessage('Invalid address line one.'),
  body('addressLineTwo')
    .optional()
    .isString()
    .withMessage('Invalid address line two.'),
  body('postcode')
    .notEmpty()
    .withMessage('Postcode is required.')
    .bail()
    .isInt()
    .withMessage('Invalid postcode.'),
  body('city')
    .notEmpty()
    .withMessage('City is required.')
    .bail()
    .isString()
    .withMessage('Invalid city.'),
  body('state')
    .notEmpty()
    .withMessage('State is required.')
    .bail()
    .isString()
    .withMessage('Invalid state.'),
  body('country')
    .notEmpty()
    .withMessage('Country is required.')
    .bail()
    .isString()
    .withMessage('Invalid country.'),
  body('isDefault')
    .notEmpty()
    .withMessage('Is default is required.')
    .bail()
    .isBoolean()
    .withMessage('Invalid is default.'),
  body('tag').optional().isString().withMessage('Invalid tag.'),
]);

export default AddUpdateAddressValidator;
