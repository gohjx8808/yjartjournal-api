import { NextFunction, Response } from "express";
import { typeAuthenticatedUser } from "../../helpers/sharedHelper";
import {
  isAddressExistExceptSelf,
  isAddressIdExist,
  validateTag,
} from "../../services/address/addressServices";
import { UpdateAddressPayload } from "../../services/address/typings";
import { CustomAuthenticatedRequest } from "../../typings";

const UpdateAddressMiddleware =
  () =>
  async (
    req: CustomAuthenticatedRequest<UpdateAddressPayload>,
    res: Response,
    next: NextFunction
  ) => {
    const user = typeAuthenticatedUser(req);
    const payload = req.body;

    if (payload.tag) {
      if (!validateTag(payload.tag)) {
        return res.status(422).json({
          message: "Invalid tag. Please select a valid tag.",
        });
      }
    }

    const addressIdExist = await isAddressIdExist(user.id, payload.addressId);

    if (!addressIdExist) {
      return res.status(422).json({ message: "Address ID not exist!" });
    }

    const sameAddressExistExceptSelf = await isAddressExistExceptSelf(
      user.id,
      payload
    );

    if (sameAddressExistExceptSelf) {
      return res
        .status(422)
        .json({ message: "Duplicated address exists after update!" });
    }

    next();
  };

export default UpdateAddressMiddleware;
