import { NextFunction, Response } from 'express';
import { typeAuthenticatedUser } from '../../helpers/sharedHelper';
import AddressServices from '../../services/address/AddressServices';
import { UpdateAddressPayload } from '../../services/address/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const UpdateAddressMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<UpdateAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const addressServices = new AddressServices();
      const user = typeAuthenticatedUser(req);
      const payload = req.body;

      if (payload.tag) {
        if (!addressServices.validateTag(payload.tag)) {
          return res.status(422).json({
            message: 'Invalid tag. Please select a valid tag.',
          });
        }
      }

      const addressIdExist = await addressServices.isAddressIdExist(
        user.id,
        payload.addressId,
      );

      if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
      }

      const sameAddressExistExceptSelf =
      await addressServices.isAddressExistExceptSelfByUserId(user.id, payload);

      if (sameAddressExistExceptSelf) {
        return res
          .status(422)
          .json({ message: 'Duplicated address exists after update!' });
      }

      next();
    };

export default UpdateAddressMiddleware;
