"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProductsValidator = void 0;
const express_validator_1 = require("express-validator");
exports.allProductsValidator = [
    (0, express_validator_1.body)('sortId').exists().withMessage('Sort ID is required').bail().isInt({ min: 1, max: 4 }).withMessage('Invalid sort ID'),
    (0, express_validator_1.body)('search').optional().isString().withMessage('Invalid search'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
//# sourceMappingURL=productValidators.js.map