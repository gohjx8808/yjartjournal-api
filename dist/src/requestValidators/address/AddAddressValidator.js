"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const AddAddressValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('receiverName')
        .notEmpty()
        .withMessage('Receiver name is required.')
        .isString()
        .withMessage('Invalid receiver name.'),
    (0, express_validator_1.body)('receiverCountryCode')
        .notEmpty()
        .withMessage('Receiver country code is required.')
        .isInt()
        .withMessage('Invalid receiver country code.'),
    (0, express_validator_1.body)('receiverPhoneNumber')
        .notEmpty()
        .withMessage('Receiver phone number is required.')
        .isInt()
        .withMessage('Invalid receiver phone number.'),
    (0, express_validator_1.body)('addressLineOne')
        .notEmpty()
        .withMessage('Address line one is required.')
        .isString()
        .withMessage('Invalid address line one.'),
    (0, express_validator_1.body)('addressLineTwo')
        .optional({ nullable: true })
        .isString()
        .withMessage('Invalid address line two.'),
    (0, express_validator_1.body)('postcode')
        .notEmpty()
        .withMessage('Postcode is required.')
        .isInt()
        .withMessage('Invalid postcode.'),
    (0, express_validator_1.body)('city')
        .notEmpty()
        .withMessage('City is required.')
        .isString()
        .withMessage('Invalid city.'),
    (0, express_validator_1.body)('state.id')
        .notEmpty()
        .withMessage('State id is required.')
        .isInt()
        .withMessage('Invalid state id.'),
    (0, express_validator_1.body)('state.name')
        .notEmpty()
        .withMessage('State name is required.')
        .isString()
        .withMessage('Invalid state name.'),
    (0, express_validator_1.body)('country')
        .notEmpty()
        .withMessage('Country is required.')
        .isString()
        .withMessage('Invalid country.')
        .matches(/^\bMalaysia\b$/)
        .withMessage('Only Malaysia is allowed.'),
    (0, express_validator_1.body)('isDefault')
        .notEmpty()
        .withMessage('Is default is required.')
        .isBoolean()
        .withMessage('Invalid is default.'),
    (0, express_validator_1.body)('tag')
        .optional({ nullable: true })
        .isString()
        .withMessage('Invalid tag.'),
]);
exports.default = AddAddressValidator;
//# sourceMappingURL=AddAddressValidator.js.map