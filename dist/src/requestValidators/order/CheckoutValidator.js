"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const CheckoutValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('products.*')
        .notEmpty()
        .withMessage('At least one product is required.'),
    (0, express_validator_1.body)('products.*.id').notEmpty().withMessage('Product ID is required.'),
    (0, express_validator_1.body)('products.*.name').notEmpty().withMessage('Product name is required.'),
    (0, express_validator_1.body)('products.*.quantity')
        .notEmpty()
        .withMessage('Product quantity is required.')
        .isInt()
        .withMessage('Invalid product quantity'),
    (0, express_validator_1.body)('products.*.totalPrice')
        .notEmpty()
        .withMessage('Total price of product is required.')
        .isFloat()
        .withMessage('Invalid total price of product'),
]);
exports.default = CheckoutValidator;
//# sourceMappingURL=CheckoutValidator.js.map