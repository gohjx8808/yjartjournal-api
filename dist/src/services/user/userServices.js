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
exports.updateUserPassword = exports.generateAccessToken = exports.signUpUser = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const cryptoHelper_1 = require("../../helpers/cryptoHelper");
const userRepository_1 = require("../../repositories/userRepository");
const signUpUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedPassword = (0, cryptoHelper_1.encrypt)(payload.password);
    const response = yield (0, userRepository_1.insertNewUser)(payload, encryptedPassword);
    return response;
});
exports.signUpUser = signUpUser;
const generateAccessToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userRepository_1.getUserByEmail)(payload.email);
    const accessToken = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email }, process.env.JWT_SIGN_TOKEN);
    return { accessToken, user };
});
exports.generateAccessToken = generateAccessToken;
const updateUserPassword = (userId, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedNewPassword = (0, cryptoHelper_1.encrypt)(newPassword);
    yield (0, userRepository_1.updatePasswordByUserId)(userId, encryptedNewPassword);
});
exports.updateUserPassword = updateUserPassword;
//# sourceMappingURL=userServices.js.map