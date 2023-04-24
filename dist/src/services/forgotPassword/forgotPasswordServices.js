"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.performForgotPasswordOperation = void 0;
const crypto_1 = require("crypto");
const sgMail_1 = require("../../mail/sgMail");
const forgotPasswordRepository_1 = require("../../repositories/forgotPasswordRepository");
const userRepository_1 = require("../../repositories/userRepository");
const userServices_1 = require("../user/userServices");
const insertForgotPasswordToken = async (user) => {
    const token = (0, crypto_1.randomBytes)(16).toString('hex');
    const result = await (0, forgotPasswordRepository_1.insertNewResetPasswordToken)(user, token);
    return result;
};
const sendForgotPasswordEmail = async (email, name, resetPasswordLink, expiredAt) => {
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
const performForgotPasswordOperation = async (email) => {
    const userDetails = await (0, userRepository_1.getUserByEmail)(email);
    const tokenDetails = await insertForgotPasswordToken(userDetails);
    const resetPasswordLink = `${process.env.YJARTJOURNAL_LINK}/${tokenDetails.token}`;
    await sendForgotPasswordEmail(email, userDetails.preferredName || userDetails.name, resetPasswordLink, tokenDetails.expiredAt.toLocaleDateString('en-GB'));
};
exports.performForgotPasswordOperation = performForgotPasswordOperation;
const resetUserPassword = async (payload) => {
    const tokenDetails = await (0, forgotPasswordRepository_1.getResetPasswordEntryByToken)(payload.token);
    await (0, userServices_1.updateUserPassword)(tokenDetails.user.id, payload.password);
    await (0, forgotPasswordRepository_1.updateResetPasswordTokenUsage)(payload.token);
};
exports.resetUserPassword = resetUserPassword;
//# sourceMappingURL=forgotPasswordServices.js.map