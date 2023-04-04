"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../../customValidator"));
const DeleteYarnCategoryValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('id')
        .notEmpty()
        .withMessage('Yarn category id is required.')
        .isInt()
        .withMessage('Invalid yarn category id.'),
]);
exports.default = DeleteYarnCategoryValidator;
//# sourceMappingURL=DeleteYarnCategoryValidator.js.map