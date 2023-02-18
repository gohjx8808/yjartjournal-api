"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CheckoutValidator_1 = __importDefault(require("../requestValidators/order/CheckoutValidator"));
const orderServices_1 = require("../services/order/orderServices");
const upload = (0, multer_1.default)();
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.post('/checkout', ...[upload.none(), ...CheckoutValidator_1.default], (req, res) => {
    const payload = req.body;
    (0, orderServices_1.checkout)(payload);
});
//# sourceMappingURL=orderRouter.js.map