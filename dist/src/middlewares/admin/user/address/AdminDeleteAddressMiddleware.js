"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddressServices_1 = __importDefault(require("../../../../services/address/AddressServices"));
const AdminDeleteAddressMiddleware = () => async (req, res, next) => {
    const addressServices = new AddressServices_1.default();
    const payload = req.body;
    const addressIdExist = await addressServices.getAddressById(payload.addressId);
    if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
    }
    next();
};
exports.default = AdminDeleteAddressMiddleware;
//# sourceMappingURL=AdminDeleteAddressMiddleware.js.map