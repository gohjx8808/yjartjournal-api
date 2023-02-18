import { NextFunction, Response } from 'express';
import { Users } from '../../entities/Users';
import { checkAddressIdExist } from '../../services/address/addressServices';
import { DeleteAddressPayload } from '../../services/address/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const DeleteAddressMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<DeleteAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = req.user.valueOf() as Users;
      const payload = req.body;

      const addressIdExist = await checkAddressIdExist(user, payload.addressId);

      if (!addressIdExist) {
        res.status(422).json({ message: 'Address ID not exist!' });
      }

      next();
    };

export default DeleteAddressMiddleware;
