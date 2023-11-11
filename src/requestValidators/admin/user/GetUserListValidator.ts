import { body } from 'express-validator';
import customValidator from '../../customValidator';

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
  body('sortBy.name').optional().isString().withMessage('Invalid sort by name'),
  body('sortBy.order')
    .optional({ values: 'falsy' })
    .matches(/^(desc|asc)$/)
    .withMessage('Invalid sort by order'),
]);

export default GetUserListValidator;
