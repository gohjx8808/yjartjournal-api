import { NextFunction, Request, Response } from 'express';
import { userRepository } from '../dataSource';
import { decrypt } from '../helpers/cryptoHelper';
import { SignInPayload } from '../services/user/typings';

const SignInMiddleware =
  () =>
    async (
      req: Request<{}, any, SignInPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;

      const user = await userRepository
        .createQueryBuilder()
        .where({ email: payload.email })
        .getOne();

      if (!user) {
        return res.status(401).json({ message: 'User not exist!' });
      } else {
        const decryptedPassword = decrypt(user.password, user.iv);
        if (decryptedPassword !== payload.password) {
          return res
            .status(401)
            .json({ message: 'Incorrect username/password!' });
        }

        next();
      }
    };

export default SignInMiddleware;
