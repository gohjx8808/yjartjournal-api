import { NextFunction, Response } from 'express';
import { Users } from '../../entities/Users';
import { checkAddressExist } from '../../services/address/addressServices';
import { AddAddressPayload } from '../../services/address/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const AddAddressMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<AddAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const payload = req.body;
      const user = req.user.valueOf() as Users;

      const addressExist = await checkAddressExist(user, payload);

      if (addressExist) {
        return res.status(422).json({ message: 'Same address exist.' });
      }

      return next();
    };

export default AddAddressMiddleware;
