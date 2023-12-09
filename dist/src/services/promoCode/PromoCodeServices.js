"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PromoCodeRepository_1 = __importDefault(require("../../repositories/PromoCodeRepository"));
const orderRepository_1 = require("../../repositories/orderRepository");
const AddressServices_1 = __importDefault(require("../address/AddressServices"));
class PromoCodeServices {
    addressServices = new AddressServices_1.default();
    promoCodeRepository = new PromoCodeRepository_1.default();
    getByName = (promoCode) => this.promoCodeRepository.getPromoCodeByName(promoCode);
    getById = (promoCodeId) => this.promoCodeRepository.getPromoCodeById(promoCodeId);
    validatePromoCode = async (promoCode, userId) => {
        const foundPromoCode = await this.getByName(promoCode);
        if (!foundPromoCode) {
            return { success: false, message: 'Invalid promo code.' };
        }
        const currentDate = new Date();
        if (currentDate < foundPromoCode.startedAt) {
            return { success: false, message: 'Promo is not started.' };
        }
        if (currentDate > foundPromoCode.expiredAt) {
            return { success: false, message: 'Promo expired.' };
        }
        const userAddresses = await this.addressServices.getAddressList(userId);
        let promoCodeUsedAmount = 0;
        userAddresses.map(async (address) => {
            const addressPromoCode = await (0, orderRepository_1.getOrderByAddressPromoCodeUsed)(address, foundPromoCode);
            promoCodeUsedAmount += addressPromoCode.length;
        });
        if (promoCodeUsedAmount > foundPromoCode.useLimit) {
            return { success: false, message: 'Promo limit exceeded.' };
        }
        return { success: true, message: '' };
    };
}
exports.default = PromoCodeServices;
//# sourceMappingURL=PromoCodeServices.js.map