"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const sgMail_1 = require("../../mail/sgMail");
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
const forgotPasswordRepository_1 = require("../../repositories/forgotPasswordRepository");
const UserServices_1 = __importDefault(require("../user/UserServices"));
class ForgotPasswordServices {
    userRepository = new UserRepository_1.default();
    userServices = new UserServices_1.default();
    insertForgotPasswordToken = async (user) => {
        const token = (0, crypto_1.randomBytes)(16).toString('hex');
        const result = await (0, forgotPasswordRepository_1.insertNewResetPasswordToken)(user, token);
        return result;
    };
    sendForgotPasswordEmail = async (email, name, resetPasswordLink, expiredAt) => {
        const emailMsg = {
            personalizations: [{ to: [{ email }] }],
            from: { email: 'yj.artjournal@gmail.com', name: 'YJ Art Journal' },
            templateId: 'd-76de8ebd97e34a549b7cdf1e0f259481',
            dynamicTemplateData: {
                name,
                expiredAt,
                resetPasswordLink,
            },
        };
        await (0, sgMail_1.sendEmail)(emailMsg);
    };
    performForgotPasswordOperation = async (email) => {
        const userDetails = await this.userRepository.getUserByEmail(email);
        const tokenDetails = await this.insertForgotPasswordToken(userDetails);
        const resetPasswordLink = `${process.env.YJARTJOURNAL_LINK}/${tokenDetails.token}`;
        await this.sendForgotPasswordEmail(email, userDetails.preferredName || userDetails.name, resetPasswordLink, tokenDetails.expiredAt.toLocaleDateString('en-GB'));
    };
    resetUserPassword = async (payload) => {
        const tokenDetails = await (0, forgotPasswordRepository_1.getResetPasswordEntryByToken)(payload.token);
        await this.userServices.updateUserPassword(tokenDetails.user.id, payload.password);
        await (0, forgotPasswordRepository_1.updateResetPasswordTokenUsage)(payload.token);
    };
}
exports.default = ForgotPasswordServices;
//# sourceMappingURL=ForgotPasswordServices.js.map