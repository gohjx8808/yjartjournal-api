import { NextFunction, Response } from 'express';
import { typeAuthenticatedUser } from '../../helpers/sharedHelper';
import { isAddressIdExist } from '../../services/address/addressServices';
import { DeleteAddressPayload } from '../../services/address/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const DeleteAddressMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<DeleteAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = typeAuthenticatedUser(req);
      const payload = req.body;

      const addressIdExist = await isAddressIdExist(user.id, payload.addressId);

      if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
      }

      next();
    };

export default DeleteAddressMiddleware;
