"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddressServices_1 = __importDefault(require("../../../../services/address/AddressServices"));
const AdminAddAddressMiddleware = () => async (req, res, next) => {
    const addressServices = new AddressServices_1.default();
    const payload = req.body;
    if (payload.tag) {
        if (!addressServices.validateTag(payload.tag)) {
            return res
                .status(422)
                .json({ message: 'Invalid tag. Please select a valid tag.' });
        }
    }
    const addressExist = (await addressServices.isAddressExist(payload.userId, payload)).exist;
    if (addressExist) {
        return res.status(422).json({
            message: 'Duplicated address detected. Please use a different address.',
        });
    }
    next();
};
exports.default = AdminAddAddressMiddleware;
//# sourceMappingURL=AdminAddAddressMiddleware.js.map