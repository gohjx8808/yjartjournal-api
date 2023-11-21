"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUserServices_1 = __importDefault(require("../../../../services/admin/user/AdminUserServices"));
const AssignableRolesMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const adminUserServices = new AdminUserServices_1.default();
    const assignableRoles = await adminUserServices.getAssignableRoles(payload);
    if (assignableRoles.length === 0 ||
        !assignableRoles.find((role) => role.id === payload.roleId)) {
        return res.status(422).json({ message: 'Role assigned.' });
    }
    next();
};
exports.default = AssignableRolesMiddleware;
//# sourceMappingURL=AssignableRolesMiddleware.js.map