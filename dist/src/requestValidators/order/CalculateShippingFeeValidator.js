"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const CalculateShippingFeeValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('state')
        .notEmpty()
        .withMessage('State is required.')
        .isObject()
        .withMessage('Invalid state.'),
    (0, express_validator_1.body)('totalAmount')
        .notEmpty()
        .withMessage('Total amount is required.')
        .isFloat()
        .withMessage('Invalid total amount.'),
]);
exports.default = CalculateShippingFeeValidator;
//# sourceMappingURL=CalculateShippingFeeValidator.js.map