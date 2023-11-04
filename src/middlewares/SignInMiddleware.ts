import { NextFunction, Request, Response } from 'express';
import { AssignableRoles } from '../entities/Roles';
import { decrypt } from '../helpers/cryptoHelper';
import RoleRepository from '../repositories/RoleRepository';
import UserRepository from '../repositories/UserRepository';
import UserRolesRepository from '../repositories/UserRolesRepository';
import { SignInPayload } from '../services/user/typings';

const SignInMiddleware =
  () =>
    async (
      req: Request<{}, any, SignInPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const userRoleRepository = new UserRolesRepository();
      const roleRepository = new RoleRepository();
      const userRepository = new UserRepository();

      const payload = req.body;

      const user = await userRepository.getUserByEmail(payload.email);

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
          const userHaveRole = await userRoleRepository.existByRoleIdsAndUserId(
            [role.id],
            user.id,
          );

          if (!userHaveRole) {
            if (role.id === AssignableRoles.ADMIN_VIEW) {
              const userHaveAdminRole =
              await userRoleRepository.existByRoleIdsAndUserId(
                [AssignableRoles.ADMIN],
                user.id,
              );

              if (!userHaveAdminRole) {
                return res
                  .status(401)
                  .json({ message: 'You are not permitted!' });
              } else {
                return next();
              }
            }
            return res.status(401).json({ message: 'You are not permitted!' });
          }
        }

        next();
      }
    };

export default SignInMiddleware;
