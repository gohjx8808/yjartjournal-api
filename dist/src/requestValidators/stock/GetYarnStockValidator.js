"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const GetYarnStockValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('yarnCategoryIds').isArray().withMessage('Invalid yarn category ids.'),
    (0, express_validator_1.body)('yarnCategoryIds.*')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Invalid yarn category id.'),
    (0, express_validator_1.body)('yarnColorCategoryIds')
        .isArray()
        .withMessage('Invalid yarn color category ids.'),
    (0, express_validator_1.body)('yarnColorCategoryIds.*')
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Invalid yarn color category id.'),
]);
exports.default = GetYarnStockValidator;
//# sourceMappingURL=GetYarnStockValidator.js.map