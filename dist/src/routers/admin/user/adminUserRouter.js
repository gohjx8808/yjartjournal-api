"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Roles_1 = require("../../../entities/Roles");
const JwtAuthMiddleware_1 = __importDefault(require("../../../middlewares/JwtAuthMiddleware"));
const GetUserListValidator_1 = __importDefault(require("../../../requestValidators/admin/user/GetUserListValidator"));
const AdminUserServices_1 = __importDefault(require("../../../services/admin/user/AdminUserServices"));
const AddNewUserValidator_1 = __importDefault(require("../../../requestValidators/admin/user/AddNewUserValidator"));
const adminUserRouter = (0, express_1.Router)();
const adminUserServices = new AdminUserServices_1.default();
adminUserRouter.post('/get-all', ...[
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
adminUserRouter.post('/add-new', ...[...AddNewUserValidator_1.default, (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN])], async (req, res) => {
    const payload = req.body;
    const response = await adminUserServices.addNew(payload);
    return res.json({ data: response });
});
exports.default = adminUserRouter;
//# sourceMappingURL=adminUserRouter.js.map