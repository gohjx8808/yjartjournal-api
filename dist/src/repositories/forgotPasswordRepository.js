"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResetPasswordTokenUsage = exports.getResetPasswordEntryByToken = exports.insertNewResetPasswordToken = exports.resetPasswordManager = void 0;
const dataSource_1 = require("../dataSource");
const ResetPasswordTokens_1 = __importDefault(require("../entities/ResetPasswordTokens"));
exports.resetPasswordManager = dataSource_1.manager.getRepository(ResetPasswordTokens_1.default);
const insertNewResetPasswordToken = async (user, token) => {
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 1);
    await exports.resetPasswordManager.insert({
        user,
        token,
        expiredAt,
    });
    return { token, expiredAt };
};
exports.insertNewResetPasswordToken = insertNewResetPasswordToken;
const getResetPasswordEntryByToken = (token) => exports.resetPasswordManager.findOne({ where: { token }, relations: ['user'] });
exports.getResetPasswordEntryByToken = getResetPasswordEntryByToken;
const updateResetPasswordTokenUsage = async (token) => {
    await exports.resetPasswordManager.update({ token }, { isUsed: true });
};
exports.updateResetPasswordTokenUsage = updateResetPasswordTokenUsage;
//# sourceMappingURL=forgotPasswordRepository.js.map