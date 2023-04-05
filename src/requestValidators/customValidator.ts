import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { Middleware } from 'express-validator/src/base';

const customValidator = (
  validationChain: ValidationChain[],
  additionalValidator?: Middleware,
) => {
  let combinedValidator = null;
  if (additionalValidator) {
    combinedValidator = [additionalValidator, ...validationChain];
  } else {
    combinedValidator = [...validationChain];
  }

  return [
    ...combinedValidator,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });
      next();
    },
  ];
};

export default customValidator;
