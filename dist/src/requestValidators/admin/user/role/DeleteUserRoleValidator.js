"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../../../customValidator"));
exports.default = (0, customValidator_1.default)([
    (0, express_validator_1.body)('userRoleId')
        .notEmpty()
        .withMessage('User role id is required.')
        .isInt()
        .withMessage('Invalid user role id.'),
]);
//# sourceMappingURL=DeleteUserRoleValidator.js.map