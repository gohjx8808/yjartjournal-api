"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const UserRoles_1 = __importDefault(require("../entities/UserRoles"));
const userRolesManager = dataSource_1.manager.getRepository(UserRoles_1.default);
class UserRolesRepository {
    insertNew = async (userId, roleId) => {
        await userRolesManager.insert({
            user: { id: userId },
            role: { id: roleId },
        });
    };
    existByRoleIdsAndUserId = async (roleIds, userId) => {
        const result = await userRolesManager.exist({
            where: { user: { id: userId }, role: { id: (0, typeorm_1.In)(roleIds) } },
        });
        return result;
    };
}
exports.default = UserRolesRepository;
//# sourceMappingURL=UserRolesRepository.js.map