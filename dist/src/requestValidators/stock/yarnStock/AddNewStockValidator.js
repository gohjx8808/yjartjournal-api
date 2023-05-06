"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../../customValidator"));
const AddNewStockValidator = (0, customValidator_1.default)([
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
    (0, express_validator_1.body)('quantity')
        .notEmpty()
        .withMessage('Quantity is required.')
        .isInt()
        .withMessage('Invalid quantity.'),
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
    (0, express_validator_1.body)('image')
        .optional({ nullable: true })
        .matches(/data:image\/png;base64,/),
]);
exports.default = AddNewStockValidator;
//# sourceMappingURL=AddNewStockValidator.js.map