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
const dataSource_1 = require("../../dataSource");
const addressServices_1 = require("../../services/address/addressServices");
const orderServices_1 = require("../../services/order/orderServices");
const VerifyPromoCodeMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = req.user.valueOf();
    const existingPromoCode = yield (0, orderServices_1.getPromoCodeByName)(payload.promoCode);
    if (!existingPromoCode) {
        return res.status(422).json({ message: 'Invalid promo code.' });
    }
    const currentDate = new Date();
    if (currentDate < existingPromoCode.startedAt) {
        return res.status(422).json({ message: 'Promo is not started.' });
    }
    if (currentDate > existingPromoCode.expiredAt) {
        return res.status(422).json({ message: 'Promo expired.' });
    }
    const userAddresses = yield (0, addressServices_1.getAddressList)(user);
    let promoCodeUsedAmount = 0;
    userAddresses.map((address) => __awaiter(void 0, void 0, void 0, function* () {
        const addressPromoCode = yield dataSource_1.orderRepository.findBy({
            address: address,
            promoCodeUsed: existingPromoCode,
        });
        promoCodeUsedAmount += addressPromoCode.length;
    }));
    if (promoCodeUsedAmount > existingPromoCode.useLimit) {
        return res.status(422).json({ message: 'Promo limit exceeded.' });
    }
    next();
});
exports.default = VerifyPromoCodeMiddleware;
//# sourceMappingURL=VerifyPromoCodeMiddleware.js.map