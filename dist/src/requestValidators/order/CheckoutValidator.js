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
        .withMessage('Invalid product quantity.'),
    (0, express_validator_1.body)('products.*.totalPrice')
        .notEmpty()
        .withMessage('Total price of product is required.')
        .isFloat()
        .withMessage('Invalid total price of product.'),
    (0, express_validator_1.body)('buyerEmail')
        .notEmpty()
        .withMessage('Buyer email is required.')
        .isEmail()
        .withMessage('Invalid buyer email.'),
    (0, express_validator_1.body)('promoCodeUsedId')
        .optional()
        .isInt()
        .withMessage('Invalid promo code ID'),
    (0, express_validator_1.body)('note').optional(),
    (0, express_validator_1.body)('addToAddressBook')
        .notEmpty()
        .withMessage('Add to address book is required.')
        .isBoolean()
        .withMessage('Invalid add to address book option.'),
    (0, express_validator_1.body)('paymentOption')
        .notEmpty()
        .withMessage('Payment option is required.')
        .matches(/^\b(TNG|Bank Transfer)\b$/)
        .withMessage('Invalid payment option.'),
    (0, express_validator_1.body)('totalAmount')
        .notEmpty()
        .withMessage('Total amount is required.')
        .isFloat()
        .withMessage('Invalid total amount.'),
], (0, express_validator_1.oneOf)([
    [
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
        (0, express_validator_1.body)('addressLineTwo').optional(),
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
        (0, express_validator_1.body)('state')
            .notEmpty()
            .withMessage('State is required.')
            .isString()
            .withMessage('Invalid state.'),
        (0, express_validator_1.body)('country')
            .notEmpty()
            .withMessage('Country is required.')
            .isString()
            .withMessage('Invalid country.'),
    ],
    (0, express_validator_1.body)('addressId')
        .notEmpty()
        .withMessage('Address ID is required.')
        .isInt()
        .withMessage('Invalid address ID'),
]));
exports.default = CheckoutValidator;
//# sourceMappingURL=CheckoutValidator.js.map