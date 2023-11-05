import { NextFunction, Response } from 'express';
import { typeAuthenticatedUser } from '../../helpers/sharedHelper';
import { DeleteAddressPayload } from '../../services/address/typings';
import { CustomAuthenticatedRequest } from '../../typings';
import AddressServices from '../../services/address/AddressServicesa';

const DeleteAddressMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<DeleteAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const addressServices = new AddressServices();
      const user = typeAuthenticatedUser(req);
      const payload = req.body;

      const addressIdExist = await addressServices.isAddressIdExist(
        user.id,
        payload.addressId,
      );

      if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
      }

      next();
    };

export default DeleteAddressMiddleware;
