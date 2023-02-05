"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const UpdateAddressValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('addressId')
        .notEmpty()
        .withMessage('Address ID is required.')
        .bail()
        .isInt()
        .withMessage('Invalid address ID.'),
    (0, express_validator_1.body)('receiverName')
        .notEmpty()
        .withMessage('Receiver name is required.')
        .bail()
        .isString()
        .withMessage('Invalid receiver name.'),
    (0, express_validator_1.body)('receiverCountryCode')
        .notEmpty()
        .withMessage('Receiver country code is required.')
        .bail()
        .isInt()
        .withMessage('Invalid receiver country code.'),
    (0, express_validator_1.body)('receiverPhoneNumber')
        .notEmpty()
        .withMessage('Receiver phone number is required.')
        .bail()
        .isInt()
        .withMessage('Invalid receiver phone number.'),
    (0, express_validator_1.body)('addressLineOne')
        .notEmpty()
        .withMessage('Address line one is required.')
        .bail()
        .isString()
        .withMessage('Invalid address line one.'),
    (0, express_validator_1.body)('addressLineTwo')
        .optional()
        .isString()
        .withMessage('Invalid address line two.'),
    (0, express_validator_1.body)('postcode')
        .notEmpty()
        .withMessage('Postcode is required.')
        .bail()
        .isInt()
        .withMessage('Invalid postcode.'),
    (0, express_validator_1.body)('city')
        .notEmpty()
        .withMessage('City is required.')
        .bail()
        .isString()
        .withMessage('Invalid city.'),
    (0, express_validator_1.body)('state')
        .notEmpty()
        .withMessage('State is required.')
        .bail()
        .isString()
        .withMessage('Invalid state.'),
    (0, express_validator_1.body)('country')
        .notEmpty()
        .withMessage('Country is required.')
        .bail()
        .isString()
        .withMessage('Invalid country.'),
    (0, express_validator_1.body)('isDefault')
        .notEmpty()
        .withMessage('Is default is required.')
        .bail()
        .isBoolean()
        .withMessage('Invalid is default.'),
    (0, express_validator_1.body)('tag').optional().isString().withMessage('Invalid tag.'),
]);
exports.default = UpdateAddressValidator;
//# sourceMappingURL=UpdateAddressValidator.js.map