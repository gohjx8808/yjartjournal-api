"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderRepository_1 = require("../../repositories/orderRepository");
const AddressServices_1 = __importDefault(require("../address/AddressServices"));
class PromoCodeServices {
    addressServices = new AddressServices_1.default();
    validatePromoCode = async (promoCode, userId) => {
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
        const userAddresses = await this.addressServices.getAddressList(userId);
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
}
exports.default = PromoCodeServices;
//# sourceMappingURL=PromoCodeServices.js.map