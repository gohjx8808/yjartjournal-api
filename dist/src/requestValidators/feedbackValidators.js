"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitFeedbackValidator = void 0;
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("./customValidator"));
exports.submitFeedbackValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required.')
        .bail()
        .isString()
        .withMessage('Invalid name.')
        .bail(),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required.')
        .bail()
        .isEmail()
        .withMessage('Invalid email.')
        .bail(),
    (0, express_validator_1.body)('feedback').notEmpty().withMessage('Feedback is required.').bail(),
]);
//# sourceMappingURL=feedbackValidators.js.map