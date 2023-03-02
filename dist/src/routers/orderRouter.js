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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const JwtAuthMiddleware_1 = __importDefault(require("../middlewares/JwtAuthMiddleware"));
const VerifyPromoCodeMiddleware_1 = __importDefault(require("../middlewares/order/VerifyPromoCodeMiddleware"));
const CalculateShippingFeeValidator_1 = __importDefault(require("../requestValidators/order/CalculateShippingFeeValidator"));
const CheckoutValidator_1 = __importDefault(require("../requestValidators/order/CheckoutValidator"));
const VerifyPromoCodeValidator_1 = __importDefault(require("../requestValidators/order/VerifyPromoCodeValidator"));
const orderServices_1 = require("../services/order/orderServices");
const promoCodeServices_1 = require("../services/promoCode/promoCodeServices");
const upload = (0, multer_1.default)();
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.post('/verify-promo-code', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(),
    ...VerifyPromoCodeValidator_1.default,
    (0, VerifyPromoCodeMiddleware_1.default)(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield (0, promoCodeServices_1.getPromoCodeByName)(payload.promoCode);
    return res.json({ response });
}));
exports.orderRouter.post('/calculate-shipping-fee', ...[upload.none(), ...CalculateShippingFeeValidator_1.default], (req, res) => {
    const payload = req.body;
    const response = (0, orderServices_1.calculateShippingFee)(payload);
    return res.json({ data: { shippingFee: response } });
});
exports.orderRouter.post('/checkout', ...[upload.none(), ...CheckoutValidator_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield (0, orderServices_1.checkout)(payload);
    return res.json({ data: response });
}));
//# sourceMappingURL=orderRouter.js.map