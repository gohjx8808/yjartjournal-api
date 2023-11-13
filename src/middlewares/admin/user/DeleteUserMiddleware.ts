import { NextFunction, Response } from 'express';
import { typeAuthenticatedUser } from '../../../helpers/sharedHelper';
import { UpdateUserPayload } from '../../../services/admin/user/typings';
import { CustomAuthenticatedRequest } from '../../../typings';

const DeleteUserMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<UpdateUserPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const user = typeAuthenticatedUser(req);

      if (payload.userId === user.id) {
        return res.status(403).json({ message: 'Cannot delete self.' });
      }

      next();
    };

export default DeleteUserMiddleware;
