"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const SignInMiddleware_1 = __importDefault(require("../middlewares/SignInMiddleware"));
const SignUpMiddleware_1 = __importDefault(require("../middlewares/SignUpMiddleware"));
const SignInValidator_1 = __importDefault(require("../requestValidators/user/SignInValidator"));
const SignUpValidator_1 = __importDefault(require("../requestValidators/user/SignUpValidator"));
const UserServicesa_1 = __importDefault(require("../services/user/UserServicesa"));
const upload = (0, multer_1.default)();
const userRouter = (0, express_1.Router)();
const userServices = new UserServicesa_1.default();
userRouter.post('/sign-up', ...[upload.none(), ...SignUpValidator_1.default, (0, SignUpMiddleware_1.default)()], async (req, res) => {
    const payload = req.body;
    const response = await userServices.signUpUser(payload);
    return res.json(response);
});
userRouter.post('/sign-in', ...[upload.none(), ...SignInValidator_1.default, (0, SignInMiddleware_1.default)()], async (req, res) => {
    const payload = req.body;
    const response = await userServices.generateAccessToken(payload);
    return res.json({ data: response });
});
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map