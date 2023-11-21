import { body } from 'express-validator';
import customValidator from '../../customValidator';

export default customValidator([
  body('userId')
    .notEmpty()
    .withMessage('User ID is required.')
    .isInt()
    .withMessage('Invalid user ID.'),
]);
