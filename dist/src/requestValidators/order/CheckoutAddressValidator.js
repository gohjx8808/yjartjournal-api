"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const CheckoutAddressValidator = [
    (0, express_validator_1.oneOf)([
        [
            (0, express_validator_1.body)('receiverName')
                .notEmpty()
                .withMessage('Receiver name is required.'),
        ],
        (0, express_validator_1.body)('addressId')
            .notEmpty()
            .withMessage('Address ID is required.')
            .isInt()
            .withMessage('Invalid address ID'),
    ]),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
exports.default = CheckoutAddressValidator;
//# sourceMappingURL=CheckoutAddressValidator.js.map