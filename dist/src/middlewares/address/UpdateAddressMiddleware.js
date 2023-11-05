"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const AddressServices_1 = __importDefault(require("../../services/address/AddressServices"));
const UpdateAddressMiddleware = () => async (req, res, next) => {
    const addressServices = new AddressServices_1.default();
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    if (payload.tag) {
        if (!addressServices.validateTag(payload.tag)) {
            return res.status(422).json({
                message: 'Invalid tag. Please select a valid tag.',
            });
        }
    }
    const addressIdExist = await addressServices.isAddressIdExist(user.id, payload.addressId);
    if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
    }
    const sameAddressExistExceptSelf = await addressServices.isAddressExistExceptSelf(user.id, payload);
    if (sameAddressExistExceptSelf) {
        return res
            .status(422)
            .json({ message: 'Duplicated address exists after update!' });
    }
    next();
};
exports.default = UpdateAddressMiddleware;
//# sourceMappingURL=UpdateAddressMiddleware.js.map