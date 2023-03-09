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
exports.validatePromoCode = void 0;
const orderRepository_1 = require("../../repositories/orderRepository");
const addressServices_1 = require("../address/addressServices");
const validatePromoCode = (promoCode, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!promoCode) {
        return { success: false, message: 'Invalid promo code.' };
    }
    const currentDate = new Date();
    if (currentDate < promoCode.startedAt) {
        return { success: false, message: 'Promo is not started.' };
    }
    if (currentDate > promoCode.expiredAt) {
        return { success: false, message: 'Promo expired.' };
    }
    const userAddresses = yield (0, addressServices_1.getAddressList)(userId);
    let promoCodeUsedAmount = 0;
    userAddresses.map((address) => __awaiter(void 0, void 0, void 0, function* () {
        const addressPromoCode = yield (0, orderRepository_1.getOrderByAddressPromoCodeUsed)(address, promoCode);
        promoCodeUsedAmount += addressPromoCode.length;
    }));
    if (promoCodeUsedAmount > promoCode.useLimit) {
        return { success: false, message: 'Promo limit exceeded.' };
    }
    return { success: false, message: '' };
});
exports.validatePromoCode = validatePromoCode;
//# sourceMappingURL=promoCodeServices.js.map