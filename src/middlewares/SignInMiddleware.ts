import { NextFunction, Request, Response } from 'express';
import { decrypt } from '../helpers/cryptoHelper';
import { getUserByEmail } from '../repositories/userRepository';
import { SignInPayload } from '../services/user/typings';

const SignInMiddleware =
  () =>
    async (
      req: Request<{}, any, SignInPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;

      const user = await getUserByEmail(payload.email);

      if (!user) {
        return res.status(401).json({ message: 'User does not exist!' });
      } else {
        const decryptedPassword = decrypt(user.password, user.iv);
        if (decryptedPassword !== payload.password) {
          return res.status(401).json({
            message:
            'Your credentials are invalid! Please login with a valid username and password.',
          });
        }

        next();
      }
    };

export default SignInMiddleware;
