"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const Roles_1 = require("../../entities/Roles");
const cryptoHelper_1 = require("../../helpers/cryptoHelper");
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
const UserRolesRepository_1 = __importDefault(require("../../repositories/UserRolesRepository"));
class UserServices {
    userRolesRepository = new UserRolesRepository_1.default();
    userRepository = new UserRepository_1.default();
    signUpUser = async (payload) => {
        const encryptedPassword = (0, cryptoHelper_1.encrypt)(payload.password);
        const user = await this.userRepository.insertNewUser(payload, encryptedPassword);
        await this.userRolesRepository.insertNew(user.identifiers[0].id, Roles_1.AssignableRoles.CUSTOMER);
        return user;
    };
    generateAccessToken = async (payload) => {
        const user = await this.userRepository.getUserByEmail(payload.email);
        const accessToken = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email }, process.env.JWT_SIGN_TOKEN);
        return { accessToken, user };
    };
    updateUserPassword = async (userId, newPassword) => {
        const encryptedNewPassword = (0, cryptoHelper_1.encrypt)(newPassword);
        await this.userRepository.updatePasswordByUserId(userId, encryptedNewPassword);
    };
    getAll = async (payload) => {
        const pagination = payload.pagination;
        let sorting;
        if (payload.sortBy.order === '') {
            sorting = {
                name: 'id',
                order: 'DESC',
            };
        }
        else {
            sorting = {
                name: payload.sortBy.name,
                order: payload.sortBy.order,
            };
        }
        const allUsers = await this.userRepository.getAll(sorting);
        const users = allUsers
            .slice(pagination.page * pagination.pageSize, pagination.page + 1 * pagination.pageSize)
            .map((user) => {
            delete user.password;
            delete user.iv;
            return {
                ...user,
                gender: user.gender === 'M' ? 'Male' : 'Female',
            };
        });
        return {
            users,
            totalFiltered: allUsers.length,
        };
    };
}
exports.default = UserServices;
//# sourceMappingURL=UserServices.js.map