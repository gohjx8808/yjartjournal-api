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
exports.accountRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const JwtAuthMiddleware_1 = __importDefault(require("../middlewares/JwtAuthMiddleware"));
const UpdateAccountValidator_1 = __importDefault(require("../requestValidators/UpdateAccountValidator"));
const accountServices_1 = require("../services/account/accountServices");
const upload = (0, multer_1.default)();
exports.accountRouter = (0, express_1.Router)();
exports.accountRouter.get('/details', (0, JwtAuthMiddleware_1.default)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.valueOf();
    const details = yield (0, accountServices_1.getUserAccount)(user.id);
    res.json({ data: details });
}));
exports.accountRouter.post('/update', ...[upload.none(), ...UpdateAccountValidator_1.default, (0, JwtAuthMiddleware_1.default)()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = req.user.valueOf();
    const response = yield (0, accountServices_1.updateUserAccount)(user.id, payload);
    res.json(response);
}));
//# sourceMappingURL=accountRouter.js.map