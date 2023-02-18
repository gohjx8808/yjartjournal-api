"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const SignUpValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required.'),
    (0, express_validator_1.body)('preferredName').optional(),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email.'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required.'),
    (0, express_validator_1.body)('countryCode')
        .notEmpty()
        .withMessage('Country code is required.')
        .isInt()
        .withMessage('Invalid country code.'),
    (0, express_validator_1.body)('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required.')
        .isInt()
        .withMessage('Invalid phone number.'),
    (0, express_validator_1.body)('gender')
        .notEmpty()
        .withMessage('Gender is required.')
        .matches(/^[FM]$/)
        .withMessage('Invalid gender.'),
    (0, express_validator_1.body)('dob')
        .notEmpty()
        .withMessage('Date of birth is required.')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('Invalid date of birth.'),
]);
exports.default = SignUpValidator;
//# sourceMappingURL=SignUpValidator.js.map