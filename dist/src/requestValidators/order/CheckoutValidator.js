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
    (0, express_validator_1.body)('products.*.productId')
        .notEmpty()
        .withMessage('Product ID is required.'),
    (0, express_validator_1.body)('products.*.name').notEmpty().withMessage('Product name is required.'),
    (0, express_validator_1.body)('products.*.pricePerItem')
        .notEmpty()
        .withMessage('Price per item of product is required.')
        .isFloat()
        .withMessage('Invalid price per item of product.'),
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
    (0, express_validator_1.body)('shippingFee')
        .notEmpty()
        .withMessage('Shipping fee is required.')
        .isInt()
        .withMessage('Invalid shipping fee.'),
    (0, express_validator_1.body)('promoCodeUsed.id')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Invalid promo code id.'),
    (0, express_validator_1.body)('promoCodeUsed.name')
        .optional({ nullable: true })
        .isString()
        .withMessage('Invalid promo code name.'),
    (0, express_validator_1.body)('note')
        .optional({ nullable: true })
        .isString()
        .withMessage('Invalid note.'),
    (0, express_validator_1.body)('addToAddressBook')
        .notEmpty()
        .withMessage('Add to address book is required.')
        .isBoolean()
        .withMessage('Invalid add to address book option.'),
    (0, express_validator_1.body)('paymentMethod')
        .notEmpty()
        .withMessage('Payment method is required.')
        .matches(/^\b(TNG|Bank Transfer)\b$/)
        .withMessage('Invalid payment method.'),
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
    ],
    (0, express_validator_1.body)('addressId')
        .notEmpty()
        .withMessage('Address ID is required.')
        .isInt()
        .withMessage('Invalid address ID'),
]));
exports.default = CheckoutValidator;
//# sourceMappingURL=CheckoutValidator.js.map