import { NextFunction, Request, Response } from 'express';
import { AdminAddAddressPayload } from '../../../../services/admin/user/typings';
import AddressServices from '../../../../services/address/AddressServices';

const AdminAddAddressMiddleware =
  () =>
    async (
      req: Request<{}, any, AdminAddAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const addressServices = new AddressServices();
      const payload = req.body;

      if (payload.tag) {
        if (!addressServices.validateTag(payload.tag)) {
          return res
            .status(422)
            .json({ message: 'Invalid tag. Please select a valid tag.' });
        }
      }

      const addressExist = (
        await addressServices.isAddressExist(payload.userId, payload)
      ).exist;

      if (addressExist) {
        return res.status(422).json({
          message: 'Duplicated address detected. Please use a different address.',
        });
      }

      next();
    };

export default AdminAddAddressMiddleware;
