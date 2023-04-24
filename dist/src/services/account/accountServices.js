"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserAccount = exports.getUserAccount = void 0;
const userRepository_1 = require("../../repositories/userRepository");
const getUserAccount = async (userId) => {
    const userDetails = await (0, userRepository_1.getUserById)(userId);
    return userDetails;
};
exports.getUserAccount = getUserAccount;
const updateUserAccount = async (userId, payload) => {
    const result = await (0, userRepository_1.updateUserById)(userId, payload);
    return result;
};
exports.updateUserAccount = updateUserAccount;
//# sourceMappingURL=accountServices.js.map