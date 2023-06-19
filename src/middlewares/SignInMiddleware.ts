import { NextFunction, Request, Response } from 'express';
import { decrypt } from '../helpers/cryptoHelper';
import { getUserByEmail } from '../repositories/userRepository';
import { SignInPayload } from '../services/user/typings';
import UserRolesRepository from '../repositories/UserRolesRepository';
import RoleRepository from '../repositories/RoleRepository';

const SignInMiddleware =
  () =>
    async (
      req: Request<{}, any, SignInPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const userRoleRepository = new UserRolesRepository();
      const roleRepository = new RoleRepository();

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

        const role = await roleRepository.findById(payload.role);

        if (!role) {
          return res.status(404).json({ message: 'Invalid role!' });
        } else {
          const userHaveRole = await userRoleRepository.existByRoleIdAndUserId(
            role.id,
            user.id,
          );

          if (!userHaveRole) {
            return res.status(401).json({ message: 'You are not permitted!' });
          }
        }

        next();
      }
    };

export default SignInMiddleware;
