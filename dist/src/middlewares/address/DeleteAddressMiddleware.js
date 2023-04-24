"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const addressServices_1 = require("../../services/address/addressServices");
const DeleteAddressMiddleware = () => async (req, res, next) => {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    const addressIdExist = await (0, addressServices_1.isAddressIdExist)(user.id, payload.addressId);
    if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
    }
    next();
};
exports.default = DeleteAddressMiddleware;
//# sourceMappingURL=DeleteAddressMiddleware.js.map