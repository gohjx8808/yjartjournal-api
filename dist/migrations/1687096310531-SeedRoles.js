"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedRoles1687096310531 = void 0;
const dataSource_1 = require("../src/dataSource");
const Roles_1 = __importDefault(require("../src/entities/Roles"));
class SeedRoles1687096310531 {
    async up() {
        const rolesSeed = ['Admin', 'Admin View', 'Customer'];
        rolesSeed.map(async (role) => {
            await dataSource_1.manager.getRepository(Roles_1.default).insert({ name: role });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.SeedRoles1687096310531 = SeedRoles1687096310531;
//# sourceMappingURL=1687096310531-SeedRoles.js.map