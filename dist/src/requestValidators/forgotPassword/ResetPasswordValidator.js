"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("../customValidator"));
const ResetPasswordValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)("token").notEmpty().withMessage("Token is required."),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required."),
]);
exports.default = ResetPasswordValidator;
//# sourceMappingURL=ResetPasswordValidator.js.map