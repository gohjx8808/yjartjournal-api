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
exports.validatePromoCode = exports.getPromoCodeByName = void 0;
const dataSource_1 = require("../../dataSource");
const addressServices_1 = require("../address/addressServices");
const getPromoCodeByName = (promoCode) => __awaiter(void 0, void 0, void 0, function* () {
    return dataSource_1.promoCodeRepository.findOneBy({
        name: promoCode,
    });
});
exports.getPromoCodeByName = getPromoCodeByName;
const validatePromoCode = (promoCode, user) => __awaiter(void 0, void 0, void 0, function* () {
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
    const userAddresses = yield (0, addressServices_1.getAddressList)(user);
    let promoCodeUsedAmount = 0;
    userAddresses.map((address) => __awaiter(void 0, void 0, void 0, function* () {
        const addressPromoCode = yield dataSource_1.orderRepository.findBy({
            address: address,
            promoCodeUsed: promoCode,
        });
        promoCodeUsedAmount += addressPromoCode.length;
    }));
    if (promoCodeUsedAmount > promoCode.useLimit) {
        return { success: false, message: 'Promo limit exceeded.' };
    }
    return { success: false, message: '' };
});
exports.validatePromoCode = validatePromoCode;
//# sourceMappingURL=promoCodeServices.js.map