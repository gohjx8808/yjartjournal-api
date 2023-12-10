"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Roles_1 = require("../../../entities/Roles");
const JwtAuthMiddleware_1 = __importDefault(require("../../../middlewares/JwtAuthMiddleware"));
const UserExistsMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/UserExistsMiddleware"));
const AssignableRolesMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/role/AssignableRolesMiddleware"));
const RoleExistsMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/role/RoleExistsMiddleware"));
const UserRoleExistsMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/role/UserRoleExistsMiddleware"));
const AddUserRoleValidator_1 = __importDefault(require("../../../requestValidators/admin/user/role/AddUserRoleValidator"));
const DeleteUserRoleValidator_1 = __importDefault(require("../../../requestValidators/admin/user/role/DeleteUserRoleValidator"));
const AdminUserServices_1 = __importDefault(require("../../../services/admin/user/AdminUserServices"));
const userRoleRouter = (0, express_1.Router)();
const adminUserServices = new AdminUserServices_1.default();
userRoleRouter.post('/add', ...[
    ...AddUserRoleValidator_1.default,
    (0, UserExistsMiddleware_1.default)(),
    (0, RoleExistsMiddleware_1.default)(),
    (0, AssignableRolesMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const response = await adminUserServices.addRole(req.body);
    return res.json({ data: response });
});
userRoleRouter.post('/delete', ...[
    ...DeleteUserRoleValidator_1.default,
    (0, UserRoleExistsMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const response = await adminUserServices.deleteRole(req.body);
    return res.json({ data: response });
});
exports.default = userRoleRouter;
//# sourceMappingURL=userRoleRouter.js.map