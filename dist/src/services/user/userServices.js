"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPassword = exports.generateAccessToken = exports.signUpUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const cryptoHelper_1 = require("../../helpers/cryptoHelper");
const userRepository_1 = require("../../repositories/userRepository");
const signUpUser = async (payload) => {
    const encryptedPassword = (0, cryptoHelper_1.encrypt)(payload.password);
    const response = await (0, userRepository_1.insertNewUser)(payload, encryptedPassword);
    return response;
};
exports.signUpUser = signUpUser;
const generateAccessToken = async (payload) => {
    const user = await (0, userRepository_1.getUserByEmail)(payload.email);
    const accessToken = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email }, process.env.JWT_SIGN_TOKEN);
    return { accessToken, user };
};
exports.generateAccessToken = generateAccessToken;
const updateUserPassword = async (userId, newPassword) => {
    const encryptedNewPassword = (0, cryptoHelper_1.encrypt)(newPassword);
    await (0, userRepository_1.updatePasswordByUserId)(userId, encryptedNewPassword);
};
exports.updateUserPassword = updateUserPassword;
//# sourceMappingURL=userServices.js.map