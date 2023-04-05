import { body } from 'express-validator';
import customValidator from '../customValidator';

const DeleteAddressValidator = customValidator([
  body('addressId')
    .notEmpty()
    .withMessage('Address ID is required.')
    .isInt()
    .withMessage('Invalid address ID.'),
]);

export default DeleteAddressValidator;
