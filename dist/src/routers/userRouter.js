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
const SignInMiddleware_1 = __importDefault(require("../middlewares/SignInMiddleware"));
const SignUpMiddleware_1 = __importDefault(require("../middlewares/SignUpMiddleware"));
const SignInValidator_1 = __importDefault(require("../requestValidators/user/SignInValidator"));
const SignUpValidator_1 = __importDefault(require("../requestValidators/user/SignUpValidator"));
const userServices_1 = require("../services/user/userServices");
const upload = (0, multer_1.default)();
const userRouter = (0, express_1.Router)();
userRouter.post("/sign-up", ...[upload.none(), ...SignUpValidator_1.default, (0, SignUpMiddleware_1.default)()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield (0, userServices_1.signUpUser)(payload);
    return res.json(response);
}));
userRouter.post("/sign-in", ...[upload.none(), ...SignInValidator_1.default, (0, SignInMiddleware_1.default)()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield (0, userServices_1.generateAccessToken)(payload);
    return res.json({ data: response });
}));
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map