"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const addressServices_1 = require("../../services/address/addressServices");
const UpdateAddressMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const payload = req.body;
    if (payload.tag) {
        if (!(0, addressServices_1.validateTag)(payload.tag)) {
            return res.status(422).json({
                message: 'Invalid tag. Please select a valid tag.',
            });
        }
    }
    const addressIdExist = yield (0, addressServices_1.isAddressIdExist)(user.id, payload.addressId);
    if (!addressIdExist) {
        return res.status(422).json({ message: 'Address ID not exist!' });
    }
    const sameAddressExistExceptSelf = yield (0, addressServices_1.isAddressExistExceptSelf)(user.id, payload);
    if (sameAddressExistExceptSelf) {
        return res
            .status(422)
            .json({ message: 'Duplicated address exists after update!' });
    }
    next();
});
exports.default = UpdateAddressMiddleware;
//# sourceMappingURL=UpdateAddressMiddleware.js.map