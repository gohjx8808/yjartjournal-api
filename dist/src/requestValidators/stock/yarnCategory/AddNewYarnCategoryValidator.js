"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../../customValidator"));
const AddNewYarnCategoryValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Yarn category name is required.')
        .isString()
        .withMessage('Invalid yarn category name.'),
]);
exports.default = AddNewYarnCategoryValidator;
//# sourceMappingURL=AddNewYarnCategoryValidator.js.map