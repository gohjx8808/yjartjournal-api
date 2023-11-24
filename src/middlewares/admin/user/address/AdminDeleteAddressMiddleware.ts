import { NextFunction, Request, Response } from 'express';
import { DeleteAddressPayload } from '../../../../services/address/typings';
import AddressServices from '../../../../services/address/AddressServices';

const AdminDeleteAddressMiddleware =
  () =>
    async (
      req: Request<{}, any, DeleteAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const addressServices = new AddressServices();
      const payload = req.body;

      const addressIdExist = await addressServices.getAddressById(
        payload.addressId,
      );

      if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
      }

      next();
    };

export default AdminDeleteAddressMiddleware;
