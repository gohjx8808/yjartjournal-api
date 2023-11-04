"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const sharedHelper_1 = require("../helpers/sharedHelper");
const JwtAuthMiddleware_1 = __importDefault(require("../middlewares/JwtAuthMiddleware"));
const CheckoutMiddleware_1 = __importDefault(require("../middlewares/order/CheckoutMiddleware"));
const VerifyPromoCodeMiddleware_1 = __importDefault(require("../middlewares/order/VerifyPromoCodeMiddleware"));
const promoCodeRepository_1 = require("../repositories/promoCodeRepository");
const CalculateShippingFeeValidator_1 = __importDefault(require("../requestValidators/order/CalculateShippingFeeValidator"));
const CheckoutValidator_1 = __importDefault(require("../requestValidators/order/CheckoutValidator"));
const VerifyPromoCodeValidator_1 = __importDefault(require("../requestValidators/order/VerifyPromoCodeValidator"));
const OrderServices_1 = __importDefault(require("../services/order/OrderServices"));
const upload = (0, multer_1.default)();
const orderRouter = (0, express_1.Router)();
const orderServices = new OrderServices_1.default();
orderRouter.post('/verify-promo-code', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...VerifyPromoCodeValidator_1.default,
    (0, VerifyPromoCodeMiddleware_1.default)(),
], async (req, res) => {
    const payload = req.body;
    const response = await (0, promoCodeRepository_1.getPromoCodeByName)(payload.promoCode);
    return res.json({ data: response });
});
orderRouter.post('/calculate-shipping-fee', ...[upload.none(), ...CalculateShippingFeeValidator_1.default], (req, res) => {
    const payload = req.body;
    const response = orderServices.calculateShippingFee(payload);
    return res.json({ data: { shippingFee: response } });
});
orderRouter.post('/checkout', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(false),
    ...CheckoutValidator_1.default,
    (0, CheckoutMiddleware_1.default)(),
], async (req, res) => {
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const response = await orderServices.checkout(payload, user);
    return res.json({ data: response });
});
exports.default = orderRouter;
//# sourceMappingURL=orderRouter.js.map