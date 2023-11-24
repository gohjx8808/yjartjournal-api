"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddressServices_1 = __importDefault(require("../../../../services/address/AddressServices"));
const AdminUpdateAddressMiddleware = () => async (req, res, next) => {
    const addressServices = new AddressServices_1.default();
    const { userId, ...addressDetails } = req.body;
    if (addressDetails.tag) {
        if (!addressServices.validateTag(addressDetails.tag)) {
            return res.status(422).json({
                message: 'Invalid tag. Please select a valid tag.',
            });
        }
    }
    const existingAddress = await addressServices.getAddressById(addressDetails.addressId);
    if (!existingAddress) {
        return res.status(422).json({ message: 'Address ID not exist!' });
    }
    const sameAddressExistExceptSelf = await addressServices.isAddressExistExceptSelfByUserId(userId, addressDetails);
    if (sameAddressExistExceptSelf) {
        return res
            .status(422)
            .json({ message: 'Duplicated address exists after update!' });
    }
    next();
};
exports.default = AdminUpdateAddressMiddleware;
//# sourceMappingURL=AdminUpdateAddressMiddleware.js.map