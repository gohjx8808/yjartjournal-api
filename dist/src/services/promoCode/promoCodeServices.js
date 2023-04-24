"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePromoCode = void 0;
const orderRepository_1 = require("../../repositories/orderRepository");
const addressServices_1 = require("../address/addressServices");
const validatePromoCode = async (promoCode, userId) => {
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
    const userAddresses = await (0, addressServices_1.getAddressList)(userId);
    let promoCodeUsedAmount = 0;
    userAddresses.map(async (address) => {
        const addressPromoCode = await (0, orderRepository_1.getOrderByAddressPromoCodeUsed)(address, promoCode);
        promoCodeUsedAmount += addressPromoCode.length;
    });
    if (promoCodeUsedAmount > promoCode.useLimit) {
        return { success: false, message: 'Promo limit exceeded.' };
    }
    return { success: true, message: '' };
};
exports.validatePromoCode = validatePromoCode;
//# sourceMappingURL=promoCodeServices.js.map