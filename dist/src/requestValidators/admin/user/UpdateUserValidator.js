"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../../customValidator"));
exports.default = (0, customValidator_1.default)([
    (0, express_validator_1.body)('userId')
        .notEmpty()
        .withMessage('User ID is required.')
        .isInt()
        .withMessage('Invalid user ID.'),
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required.'),
    (0, express_validator_1.body)('preferredName')
        .optional({ nullable: true })
        .isString()
        .withMessage('Invalid preferred name.'),
    (0, express_validator_1.body)('email').isEmpty().withMessage('Email should not be updated.'),
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
//# sourceMappingURL=UpdateUserValidator.js.map