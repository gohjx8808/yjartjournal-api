import { NextFunction, Response } from 'express';
import { Users } from '../../entities/Users';
import {
  checkAddressExistExceptSelf,
  checkAddressIdExist,
  validateTag,
} from '../../services/address/addressServices';
import { UpdateAddressPayload } from '../../services/address/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const UpdateAddressMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<UpdateAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const user = req.user.valueOf() as Users;
      const payload = req.body;

      if (payload.tag) {
        if (!validateTag(payload.tag)) {
          return res.status(422).json({
            message: 'Invalid tag. Please select a valid tag.',
          });
        }
      }

      const addressIdExist = await checkAddressIdExist(user, payload.addressId);

      if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
      }

      const sameAddressExistExceptSelf = await checkAddressExistExceptSelf(
        user,
        payload,
      );

      if (sameAddressExistExceptSelf) {
        return res
          .status(422)
          .json({ message: 'Duplicated address exists after update!' });
      }

      next();
    };

export default UpdateAddressMiddleware;
