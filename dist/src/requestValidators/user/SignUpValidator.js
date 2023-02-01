"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const SignUpValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required.').bail(),
    (0, express_validator_1.body)('preferredName').optional(),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required.')
        .bail()
        .isEmail()
        .withMessage('Invalid email.')
        .bail(),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required.').bail(),
    (0, express_validator_1.body)('countryCode')
        .notEmpty()
        .withMessage('Country code is required.')
        .bail()
        .isInt()
        .withMessage('Invalid country code.')
        .bail(),
    (0, express_validator_1.body)('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required.')
        .bail()
        .isInt()
        .withMessage('Invalid phone number.')
        .bail(),
    (0, express_validator_1.body)('gender')
        .notEmpty()
        .withMessage('Gender is required.')
        .bail()
        .matches(/^[FM]$/)
        .withMessage('Invalid gender.'),
    (0, express_validator_1.body)('dob')
        .notEmpty()
        .withMessage('Date of birth is required.')
        .bail()
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('Invalid date of birth.')
        .bail(),
]);
exports.default = SignUpValidator;
//# sourceMappingURL=SignUpValidator.js.map