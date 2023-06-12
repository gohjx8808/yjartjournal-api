"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const ForgotPasswordMiddleware_1 = __importDefault(require("../middlewares/forgotPassword/ForgotPasswordMiddleware"));
const ResetPasswordMiddleware_1 = __importDefault(require("../middlewares/forgotPassword/ResetPasswordMiddleware"));
const ForgotPasswordValidator_1 = __importDefault(require("../requestValidators/forgotPassword/ForgotPasswordValidator"));
const ResetPasswordValidator_1 = __importDefault(require("../requestValidators/forgotPassword/ResetPasswordValidator"));
const forgotPasswordServices_1 = require("../services/forgotPassword/forgotPasswordServices");
const upload = (0, multer_1.default)();
const forgotPasswordRouter = (0, express_1.Router)();
forgotPasswordRouter.post('/', ...[upload.none(), ...ForgotPasswordValidator_1.default, (0, ForgotPasswordMiddleware_1.default)()], async (req, res) => {
    const payload = req.body;
    await (0, forgotPasswordServices_1.performForgotPasswordOperation)(payload.email);
    return res.json({ message: 'Reset password email sent.' });
});
forgotPasswordRouter.post('/reset-password', ...[upload.none(), ...ResetPasswordValidator_1.default, (0, ResetPasswordMiddleware_1.default)()], async (req, res) => {
    const payload = req.body;
    await (0, forgotPasswordServices_1.resetUserPassword)(payload);
    return res.json({
        message: 'Your password had been reset. Please login using your new password.',
    });
});
exports.default = forgotPasswordRouter;
//# sourceMappingURL=forgotPasswordRouter.js.map