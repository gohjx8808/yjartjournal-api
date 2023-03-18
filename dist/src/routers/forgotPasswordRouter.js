"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const forgotPasswordMiddleware_1 = __importDefault(require("../middlewares/forgotPassword/forgotPasswordMiddleware"));
const ForgotPasswordValidator_1 = __importDefault(require("../requestValidators/forgotPassword/ForgotPasswordValidator"));
const forgotPasswordServices_1 = require("../services/forgotPassword/forgotPasswordServices");
const upload = (0, multer_1.default)();
const forgotPasswordRouter = (0, express_1.Router)();
forgotPasswordRouter.post('/', ...[upload.none(), ...ForgotPasswordValidator_1.default, (0, forgotPasswordMiddleware_1.default)()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    yield (0, forgotPasswordServices_1.performForgotPasswordOperation)(payload.email);
    return res.json({ message: 'Reset password email sent.' });
}));
exports.default = forgotPasswordRouter;
//# sourceMappingURL=forgotPasswordRouter.js.map