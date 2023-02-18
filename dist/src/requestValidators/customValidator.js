"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator = (validationChain, additionalValidator) => {
    let combinedValidator = null;
    if (additionalValidator) {
        combinedValidator = [additionalValidator, ...validationChain];
    }
    else {
        combinedValidator = [...validationChain];
    }
    return [
        ...combinedValidator,
        (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            next();
        },
    ];
};
exports.default = customValidator;
//# sourceMappingURL=customValidator.js.map