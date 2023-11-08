import { body } from 'express-validator';
import customValidator from '../customValidator';

const GetUserListValidator = customValidator([
  body('pagination.pageSize')
    .notEmpty()
    .withMessage('Page size is required')
    .isInt()
    .withMessage('Invalid page size'),
  body('pagination.page')
    .notEmpty()
    .withMessage('Page is required')
    .isInt()
    .withMessage('Invalid page'),
]);

export default GetUserListValidator;
