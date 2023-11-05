import { NextFunction, Response } from 'express';
import { typeAuthenticatedUser } from '../../helpers/sharedHelper';
import AddressServices from '../../services/address/AddressServices';
import { AddAddressPayload } from '../../services/address/typings';
import { CustomAuthenticatedRequest } from '../../typings';

const AddAddressMiddleware =
  () =>
    async (
      req: CustomAuthenticatedRequest<AddAddressPayload>,
      res: Response,
      next: NextFunction,
    ) => {
      const addressServices = new AddressServices();
      const payload = req.body;
      const user = typeAuthenticatedUser(req);

      if (payload.tag) {
        if (!addressServices.validateTag(payload.tag)) {
          return res
            .status(422)
            .json({ message: 'Invalid tag. Please select a valid tag.' });
        }
      }

      const addressExist = (
        await addressServices.isAddressExist(user.id, payload)
      ).exist;

      if (addressExist) {
        return res.status(422).json({
          message: 'Duplicated address detected. Please use a different address.',
        });
      }

      next();
    };

export default AddAddressMiddleware;
