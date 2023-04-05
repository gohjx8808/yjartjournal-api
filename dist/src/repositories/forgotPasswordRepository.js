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
exports.updateResetPasswordTokenUsage = exports.getResetPasswordEntryByToken = exports.insertNewResetPasswordToken = exports.resetPasswordManager = void 0;
const dataSource_1 = require("../dataSource");
const ResetPasswordTokens_1 = __importDefault(require("../entities/ResetPasswordTokens"));
exports.resetPasswordManager = dataSource_1.manager.getRepository(ResetPasswordTokens_1.default);
const insertNewResetPasswordToken = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 1);
    yield exports.resetPasswordManager.insert({
        user,
        token,
        expiredAt,
    });
    return { token, expiredAt };
});
exports.insertNewResetPasswordToken = insertNewResetPasswordToken;
const getResetPasswordEntryByToken = (token) => exports.resetPasswordManager.findOne({ where: { token }, relations: ['user'] });
exports.getResetPasswordEntryByToken = getResetPasswordEntryByToken;
const updateResetPasswordTokenUsage = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.resetPasswordManager.update({ token }, { isUsed: true });
});
exports.updateResetPasswordTokenUsage = updateResetPasswordTokenUsage;
//# sourceMappingURL=forgotPasswordRepository.js.map