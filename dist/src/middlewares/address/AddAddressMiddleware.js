"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const addressServices_1 = require("../../services/address/addressServices");
const AddAddressMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    if (payload.tag) {
        if (!(0, addressServices_1.validateTag)(payload.tag)) {
            return res
                .status(422)
                .json({ message: 'Invalid tag. Please select a valid tag.' });
        }
    }
    const addressExist = (await (0, addressServices_1.isAddressExist)(user.id, payload)).exist;
    if (addressExist) {
        return res.status(422).json({
            message: 'Duplicated address detected. Please use a different address.',
        });
    }
    next();
};
exports.default = AddAddressMiddleware;
//# sourceMappingURL=AddAddressMiddleware.js.map