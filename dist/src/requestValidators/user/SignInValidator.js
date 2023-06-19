"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const SignInValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    (0, express_validator_1.body)('role')
        .notEmpty()
        .withMessage('Role is required')
        .isInt()
        .withMessage('Invalid role'),
]);
exports.default = SignInValidator;
//# sourceMappingURL=SignInValidator.js.map