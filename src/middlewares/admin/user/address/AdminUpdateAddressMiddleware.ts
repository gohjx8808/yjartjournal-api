import { NextFunction, Request, Response } from 'express';
import AddressServices from '../../../../services/address/AddressServices';
import { AdminUpdateAddressPayload } from '../../../../services/admin/user/typings';

const AdminUpdateAddressMiddleware =
  () =>
    async (
      req: Request<{}, any, AdminUpdateAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const addressServices = new AddressServices();
      const { userId, ...addressDetails } = req.body;

      if (addressDetails.tag) {
        if (!addressServices.validateTag(addressDetails.tag)) {
          return res.status(422).json({
            message: 'Invalid tag. Please select a valid tag.',
          });
        }
      }

      const existingAddress = await addressServices.getAddressById(
        addressDetails.addressId,
      );

      if (!existingAddress) {
        return res.status(422).json({ message: 'Address ID not exist!' });
      }

      const sameAddressExistExceptSelf =
      await addressServices.isAddressExistExceptSelfByUserId(
        userId,
        addressDetails,
      );

      if (sameAddressExistExceptSelf) {
        return res
          .status(422)
          .json({ message: 'Duplicated address exists after update!' });
      }

      next();
    };

export default AdminUpdateAddressMiddleware;
