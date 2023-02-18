"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("./customValidator"));
const FeedbackValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isString()
        .withMessage('Invalid name.'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email.'),
    (0, express_validator_1.body)('feedback').notEmpty().withMessage('Feedback is required.'),
]);
exports.default = FeedbackValidator;
//# sourceMappingURL=FeedbackValidator.js.map