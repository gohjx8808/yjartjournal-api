"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositorya_1 = __importDefault(require("../../repositories/UserRepositorya"));
class AccountServices {
    userRepository = new UserRepositorya_1.default();
    getUserAccount(userId) {
        return this.userRepository.getUserById(userId);
    }
    updateUserAccount(userId, payload) {
        return this.userRepository.updateUserById(userId, payload);
    }
}
exports.default = AccountServices;
//# sourceMappingURL=AccountServicesa.js.map