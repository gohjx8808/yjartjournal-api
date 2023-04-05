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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.performForgotPasswordOperation = void 0;
const crypto_1 = require("crypto");
const sgMail_1 = require("../../mail/sgMail");
const forgotPasswordRepository_1 = require("../../repositories/forgotPasswordRepository");
const userRepository_1 = require("../../repositories/userRepository");
const userServices_1 = require("../user/userServices");
const insertForgotPasswordToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, crypto_1.randomBytes)(16).toString("hex");
    const result = yield (0, forgotPasswordRepository_1.insertNewResetPasswordToken)(user, token);
    return result;
});
const sendForgotPasswordEmail = (email, name, resetPasswordLink, expiredAt) => __awaiter(void 0, void 0, void 0, function* () {
    const emailMsg = {
        personalizations: [{ to: [{ email }] }],
        from: { email: "yj.artjournal@gmail.com", name: "YJ Art Journal" },
        templateId: "d-76de8ebd97e34a549b7cdf1e0f259481",
        dynamicTemplateData: {
            name,
            expiredAt,
            resetPasswordLink,
        },
    };
    yield (0, sgMail_1.sendEmail)(emailMsg);
});
const performForgotPasswordOperation = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = yield (0, userRepository_1.getUserByEmail)(email);
    const tokenDetails = yield insertForgotPasswordToken(userDetails);
    const resetPasswordLink = `${process.env.YJARTJOURNAL_LINK}/${tokenDetails.token}`;
    yield sendForgotPasswordEmail(email, userDetails.preferredName || userDetails.name, resetPasswordLink, tokenDetails.expiredAt.toLocaleDateString("en-GB"));
});
exports.performForgotPasswordOperation = performForgotPasswordOperation;
const resetUserPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDetails = yield (0, forgotPasswordRepository_1.getResetPasswordEntryByToken)(payload.token);
    yield (0, userServices_1.updateUserPassword)(tokenDetails.user.id, payload.password);
    yield (0, forgotPasswordRepository_1.updateResetPasswordTokenUsage)(payload.token);
});
exports.resetUserPassword = resetUserPassword;
//# sourceMappingURL=forgotPasswordServices.js.map