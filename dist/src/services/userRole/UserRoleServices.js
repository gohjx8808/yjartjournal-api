"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRolesRepository_1 = __importDefault(require("../../repositories/UserRolesRepository"));
class UserRoleServices {
    userRolesRepository = new UserRolesRepository_1.default();
    getById = (userId) => this.userRolesRepository.getByUserId(userId);
}
exports.default = UserRoleServices;
//# sourceMappingURL=UserRoleServices.js.map