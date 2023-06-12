"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promoCodeRepository_1 = require("../../repositories/promoCodeRepository");
const CheckoutMiddleware = () => async (req, res, next) => {
    const user = req.user?.valueOf();
    const payload = req.body;
    if (!user && payload.addressId) {
        return res
            .status(401)
            .json({ message: 'You are not allowed to use this address.' });
    }
    const existingPromoCode = await (0, promoCodeRepository_1.getPromoCodeById)(payload.promoCodeUsed.id);
    if (!existingPromoCode) {
        return res.status(404).json({ message: 'Invalid promo code.' });
    }
    next();
};
exports.default = CheckoutMiddleware;
//# sourceMappingURL=CheckoutMiddleware.js.map