"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const Roles_1 = require("../../../entities/Roles");
const JwtAuthMiddleware_1 = __importDefault(require("../../../middlewares/JwtAuthMiddleware"));
const UniqueEmailMiddleware_1 = __importDefault(require("../../../middlewares/UniqueEmailMiddleware"));
const DeleteUserMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/DeleteUserMiddleware"));
const UserExistsMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/UserExistsMiddleware"));
const UserRoleExistsMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/role/UserRoleExistsMiddleware"));
const AddNewUserValidator_1 = __importDefault(require("../../../requestValidators/admin/user/AddNewUserValidator"));
const UserIdValidator_1 = __importDefault(require("../../../requestValidators/admin/user/UserIdValidator"));
const GetUserListValidator_1 = __importDefault(require("../../../requestValidators/admin/user/GetUserListValidator"));
const UpdateUserValidator_1 = __importDefault(require("../../../requestValidators/admin/user/UpdateUserValidator"));
const DeleteUserRoleValidator_1 = __importDefault(require("../../../requestValidators/admin/user/role/DeleteUserRoleValidator"));
const AdminUserServices_1 = __importDefault(require("../../../services/admin/user/AdminUserServices"));
const AddUserRoleValidator_1 = __importDefault(require("../../../requestValidators/admin/user/role/AddUserRoleValidator"));
const RoleExistsMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/role/RoleExistsMiddleware"));
const AssignableRolesMiddleware_1 = __importDefault(require("../../../middlewares/admin/user/role/AssignableRolesMiddleware"));
const adminUserRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const adminUserServices = new AdminUserServices_1.default();
adminUserRouter.post('/get-all', ...[
    upload.none(),
    ...GetUserListValidator_1.default,
    (0, JwtAuthMiddleware_1.default)(true, [
        Roles_1.AssignableRoles.ADMIN,
        Roles_1.AssignableRoles.ADMIN_VIEW,
    ]),
], async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.getAll(payload);
    return res.json({ data: response });
});
adminUserRouter.post('/add-new', ...[
    upload.none(),
    ...AddNewUserValidator_1.default,
    (0, UniqueEmailMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.addNew(payload);
    return res.json({ data: response });
});
adminUserRouter.post('/update', ...[
    upload.none(),
    ...UpdateUserValidator_1.default,
    (0, UserExistsMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.update(payload);
    return res.json({ data: response });
});
adminUserRouter.post('/delete', ...[
    upload.none(),
    ...UserIdValidator_1.default,
    (0, UserExistsMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    (0, DeleteUserMiddleware_1.default)(),
], async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.delete(payload);
    return res.json({ data: response });
});
adminUserRouter.get('/form-options', (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN_VIEW, Roles_1.AssignableRoles.ADMIN]), async (req, res) => {
    const response = await adminUserServices.getFormOptions();
    return res.json({ data: response });
});
adminUserRouter.post('/role/add', ...[
    ...AddUserRoleValidator_1.default,
    (0, UserExistsMiddleware_1.default)(),
    (0, RoleExistsMiddleware_1.default)(),
    (0, AssignableRolesMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const response = await adminUserServices.addRole(req.body);
    return res.json({ data: response });
});
adminUserRouter.post('/role/delete', ...[
    ...DeleteUserRoleValidator_1.default,
    (0, UserRoleExistsMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
], async (req, res) => {
    const response = await adminUserServices.deleteRole(req.body);
    return res.json({ data: response });
});
adminUserRouter.post('/assignable-roles', ...[
    ...UserIdValidator_1.default,
    (0, UserExistsMiddleware_1.default)(),
    (0, JwtAuthMiddleware_1.default)(true, [
        Roles_1.AssignableRoles.ADMIN,
        Roles_1.AssignableRoles.ADMIN_VIEW,
    ]),
], async (req, res) => {
    const response = await adminUserServices.getAssignableRoles(req.body);
    return res.json({ data: response });
});
exports.default = adminUserRouter;
//# sourceMappingURL=adminUserRouter.js.map