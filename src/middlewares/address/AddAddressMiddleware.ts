import { NextFunction, Response } from 'express';
import { Users } from '../../entities/Users';
import {
  checkAddressExist,
  validateTag,
} from '../../services/address/addressServices';
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

      if (payload.tag) {
        if (!validateTag(payload.tag)) {
          res
            .status(422)
            .json({ message: 'Invalid tag. Please select a valid tag.' });
        }
      }

      const addressExist = await checkAddressExist(user, payload);

      if (addressExist) {
        return res.status(422).json({
          message: 'Duplicated address detected. Please use a different address.',
        });
      }

      next();
    };

export default AddAddressMiddleware;
