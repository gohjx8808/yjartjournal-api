import { body } from 'express-validator';
import customValidator from '../customValidator';

const AddAddressValidator = customValidator([
  body('receiverName')
    .notEmpty()
    .withMessage('Receiver name is required.')
    .isString()
    .withMessage('Invalid receiver name.'),
  body('receiverCountryCode')
    .notEmpty()
    .withMessage('Receiver country code is required.')
    .isInt()
    .withMessage('Invalid receiver country code.'),
  body('receiverPhoneNumber')
    .notEmpty()
    .withMessage('Receiver phone number is required.')
    .isInt()
    .withMessage('Invalid receiver phone number.'),
  body('addressLineOne')
    .notEmpty()
    .withMessage('Address line one is required.')
    .isString()
    .withMessage('Invalid address line one.'),
  body('addressLineTwo')
    .optional()
    .isString()
    .withMessage('Invalid address line two.'),
  body('postcode')
    .notEmpty()
    .withMessage('Postcode is required.')
    .isInt()
    .withMessage('Invalid postcode.'),
  body('city')
    .notEmpty()
    .withMessage('City is required.')
    .isString()
    .withMessage('Invalid city.'),
  body('stateId')
    .notEmpty()
    .withMessage('State is required.')
    .isInt()
    .withMessage('Invalid state.'),
  body('country')
    .notEmpty()
    .withMessage('Country is required.')
    .isString()
    .withMessage('Invalid country.'),
  body('isDefault')
    .notEmpty()
    .withMessage('Is default is required.')
    .isBoolean()
    .withMessage('Invalid is default.'),
  body('tag').optional().isString().withMessage('Invalid tag.'),
]);

export default AddAddressValidator;
