"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const Roles_1 = __importDefault(require("../entities/Roles"));
const roleManager = dataSource_1.manager.getRepository(Roles_1.default);
class RoleRepository {
    getAll = () => roleManager.find();
    findById = (roleId) => roleManager.findOneBy({ id: roleId });
    getUnassignRoles = (roleIds) => roleManager.findBy({ id: (0, typeorm_1.Not)((0, typeorm_1.In)(roleIds)) });
}
exports.default = RoleRepository;
//# sourceMappingURL=RoleRepository.js.map