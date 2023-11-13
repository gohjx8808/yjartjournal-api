"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoHelper_1 = require("../../../helpers/cryptoHelper");
const UserRepository_1 = __importDefault(require("../../../repositories/UserRepository"));
const UserRolesRepository_1 = __importDefault(require("../../../repositories/UserRolesRepository"));
const RoleRepository_1 = __importDefault(require("../../../repositories/RoleRepository"));
class AdminUserServices {
    userRepository = new UserRepository_1.default();
    roleRepository = new RoleRepository_1.default();
    userRolesRepository = new UserRolesRepository_1.default();
    getAll = async (payload) => {
        const pagination = payload.pagination;
        const search = payload.filter.toLowerCase();
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
        let allUsers = await this.userRepository.getAll(sorting);
        if (search) {
            allUsers = this.filterUserList(allUsers, search);
        }
        const users = allUsers
            .slice(pagination.page * pagination.pageSize, pagination.page + 1 * pagination.pageSize)
            .map((user) => {
            delete user.password;
            delete user.iv;
            return {
                ...user,
                gender: this.formatGender(user.gender),
            };
        });
        return {
            users,
            totalFiltered: allUsers.length,
        };
    };
    formatGender(gender) {
        return gender === 'M' ? 'Male' : 'Female';
    }
    filterUserList(userList, search) {
        return userList.filter((user) => user.name.toLowerCase().includes(search) ||
            user.preferredName.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search) ||
            this.formatGender(user.gender).toLowerCase().includes(search) ||
            user.dob.includes(search) ||
            `${user.countryCode} ${user.phoneNumber}`.includes(search));
    }
    addNew = async (payload) => {
        const encryptedPassword = (0, cryptoHelper_1.encrypt)(process.env.DEFAULT_PASSWORD);
        const user = await this.userRepository.insertNewUser(payload, encryptedPassword);
        payload.roleIds.map(async (roleId) => {
            await this.userRolesRepository.insertNew(user.identifiers[0].id, roleId);
        });
        return user;
    };
    update(payload) {
        const { userId, ...userDetails } = payload;
        return this.userRepository.updateUserById(userId, userDetails);
    }
    delete = (payload) => this.userRepository.deleteById(payload.userId);
    getFormOptions = async () => {
        const roles = await this.roleRepository.getAll();
        return {
            roles,
            gender: [
                { id: 'M', name: 'Male' },
                { id: 'F', name: 'Female' },
            ],
        };
    };
}
exports.default = AdminUserServices;
//# sourceMappingURL=AdminUserServices.js.map