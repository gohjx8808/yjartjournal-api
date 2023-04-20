"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../../customValidator"));
const UpdateStockValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('yarnId')
        .notEmpty()
        .withMessage('Yarn id is required.')
        .isInt()
        .withMessage('Invalid yarn id.'),
    (0, express_validator_1.body)('yarnCategory')
        .notEmpty()
        .withMessage('Yarn category is required.')
        .isObject()
        .withMessage('Invalid yarn category.'),
    (0, express_validator_1.body)('yarnColorCategory')
        .notEmpty()
        .withMessage('Yarn color category is required.')
        .isObject()
        .withMessage('Invalid yarn color category.'),
    (0, express_validator_1.body)('detailedColor')
        .notEmpty()
        .withMessage('Detailed color is required.')
        .isString()
        .withMessage('Invalid detailed color.'),
    (0, express_validator_1.body)('cost')
        .notEmpty()
        .withMessage('Cost is required.')
        .isFloat()
        .withMessage('Invalid cost.'),
    (0, express_validator_1.body)('quantity').isEmpty().withMessage('Quantity should be empty.'),
    (0, express_validator_1.body)('reorderLevel')
        .notEmpty()
        .withMessage('Reorder level is required.')
        .isInt()
        .withMessage('Invalid reorder level.'),
    (0, express_validator_1.body)('lastOrderedDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid last ordered date.'),
]);
exports.default = UpdateStockValidator;
//# sourceMappingURL=UpdateStockValidator.js.map