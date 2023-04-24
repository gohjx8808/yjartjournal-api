"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const addressServices_1 = require("../../services/address/addressServices");
const UpdateAddressMiddleware = () => async (req, res, next) => {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    if (payload.tag) {
        if (!(0, addressServices_1.validateTag)(payload.tag)) {
            return res.status(422).json({
                message: 'Invalid tag. Please select a valid tag.',
            });
        }
    }
    const addressIdExist = await (0, addressServices_1.isAddressIdExist)(user.id, payload.addressId);
    if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
    }
    const sameAddressExistExceptSelf = await (0, addressServices_1.isAddressExistExceptSelf)(user.id, payload);
    if (sameAddressExistExceptSelf) {
        return res
            .status(422)
            .json({ message: 'Duplicated address exists after update!' });
    }
    next();
};
exports.default = UpdateAddressMiddleware;
//# sourceMappingURL=UpdateAddressMiddleware.js.map