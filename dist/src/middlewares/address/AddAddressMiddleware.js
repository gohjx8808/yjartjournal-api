"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const AddressServices_1 = __importDefault(require("../../services/address/AddressServices"));
const AddAddressMiddleware = () => async (req, res, next) => {
    const addressServices = new AddressServices_1.default();
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    if (payload.tag) {
        if (!addressServices.validateTag(payload.tag)) {
            return res
                .status(422)
                .json({ message: 'Invalid tag. Please select a valid tag.' });
        }
    }
    const addressExist = (await addressServices.isAddressExist(user.id, payload)).exist;
    if (addressExist) {
        return res.status(422).json({
            message: 'Duplicated address detected. Please use a different address.',
        });
    }
    next();
};
exports.default = AddAddressMiddleware;
//# sourceMappingURL=AddAddressMiddleware.js.map