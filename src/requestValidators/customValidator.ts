import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

const customValidator = (validationChain: ValidationChain[]) => [
  ...validationChain,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export default customValidator;
