"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PromoCodeServices_1 = __importDefault(require("../../services/promoCode/PromoCodeServices"));
const CheckoutMiddleware = () => async (req, res, next) => {
    const user = req.user?.valueOf();
    const payload = req.body;
    const promoCodeServices = new PromoCodeServices_1.default();
    if (!user && payload.addressId) {
        return res
            .status(401)
            .json({ message: 'You are not allowed to use this address.' });
    }
    const existingPromoCode = await promoCodeServices.getById(payload.promoCodeUsed.id);
    if (!existingPromoCode) {
        return res.status(404).json({ message: 'Invalid promo code.' });
    }
    next();
};
exports.default = CheckoutMiddleware;
//# sourceMappingURL=CheckoutMiddleware.js.map