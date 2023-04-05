"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const customValidator_1 = __importDefault(require("./customValidator"));
const GetProductValidator = (0, customValidator_1.default)([
    (0, express_validator_1.body)("sortId")
        .notEmpty()
        .withMessage("Sort ID is required.")
        .isInt({ min: 1, max: 4 })
        .withMessage("Invalid sort ID."),
    (0, express_validator_1.body)("search")
        .optional({ nullable: true })
        .isString()
        .withMessage("Invalid search."),
]);
exports.default = GetProductValidator;
//# sourceMappingURL=GetProductValidator.js.map