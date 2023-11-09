"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const GetUserListValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('pagination.pageSize')
        .notEmpty()
        .withMessage('Page size is required')
        .isInt()
        .withMessage('Invalid page size'),
    (0, express_validator_1.body)('pagination.page')
        .notEmpty()
        .withMessage('Page is required')
        .isInt()
        .withMessage('Invalid page'),
    (0, express_validator_1.body)('sortBy.name').optional().isString().withMessage('Invalid sort by name'),
    (0, express_validator_1.body)('sortBy.order')
        .notEmpty()
        .withMessage('Sort by order is required')
        .matches(/^(DESC|ASC|Default)$/)
        .withMessage('Invalid sort by order'),
]);
exports.default = GetUserListValidator;
//# sourceMappingURL=GetUserListValidator.js.map