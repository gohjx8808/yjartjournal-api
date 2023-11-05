"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const AddressServicesa_1 = __importDefault(require("../../services/address/AddressServicesa"));
const DeleteAddressMiddleware = () => async (req, res, next) => {
    const addressServices = new AddressServicesa_1.default();
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    const addressIdExist = await addressServices.isAddressIdExist(user.id, payload.addressId);
    if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
    }
    next();
};
exports.default = DeleteAddressMiddleware;
//# sourceMappingURL=DeleteAddressMiddleware.js.map