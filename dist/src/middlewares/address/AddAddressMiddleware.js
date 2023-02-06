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
const addressServices_1 = require("../../services/address/addressServices");
const AddAddressMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = req.user.valueOf();
    if (payload.tag) {
        if (!(0, addressServices_1.validateTag)(payload.tag)) {
            return res.status(422).json({
                message: 'Invalid tag. Please select a valid tag.',
            });
        }
    }
    const addressExist = yield (0, addressServices_1.checkAddressExist)(user, payload);
    if (addressExist) {
        return res.status(422).json({
            message: 'Duplicated address detected. Please use a different address.',
        });
    }
    return next();
});
exports.default = AddAddressMiddleware;
//# sourceMappingURL=AddAddressMiddleware.js.map