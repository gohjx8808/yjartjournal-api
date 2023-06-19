import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomAuthenticatedRequest } from '../typings';
import { AssignableRoles } from '../entities/Roles';
import UserRolesRepository from '../repositories/UserRolesRepository';
import { AuthenticatedUserData } from '../services/user/typings';

const handleError = (required: boolean, next: NextFunction, res: Response) => {
  if (required) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
};

const JwtAuthMiddleware =
  (required = true, roleId: number = AssignableRoles.CUSTOMER) =>
    (req: CustomAuthenticatedRequest, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      const userRolesRepository = new UserRolesRepository();
      if (authHeader) {
        const token = authHeader.split(' ')[1];

        verify(token, process.env.JWT_SIGN_TOKEN, async (err, user) => {
          if (err) {
            return handleError(required, next, res);
          } else {
            const userHasRole = await userRolesRepository.existByRoleIdAndUserId(
              roleId,
              (user.valueOf() as AuthenticatedUserData).id,
            );
            if (!userHasRole) {
              return handleError(required, next, res);
            }
          }
          req.user = user;
          next();
        });
      } else {
        return handleError(required, next, res);
      }
    };

export default JwtAuthMiddleware;
