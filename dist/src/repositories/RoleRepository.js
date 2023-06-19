"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const Roles_1 = __importDefault(require("../entities/Roles"));
const roleManager = dataSource_1.manager.getRepository(Roles_1.default);
class RoleRepository {
    findById = async (roleId) => {
        const result = await roleManager.findOneBy({ id: roleId });
        return result;
    };
}
exports.default = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map