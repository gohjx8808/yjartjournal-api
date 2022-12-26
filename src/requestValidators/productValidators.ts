import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const allProductsValidator = [
  body('sortId').exists().withMessage('Sort ID is required').bail().isInt({ min:1, max:4 }).withMessage('Invalid sort ID'),
  body('search').optional().isString().withMessage('Invalid search'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
