"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const Roles_1 = require("../entities/Roles");
const UserRolesRepository_1 = __importDefault(require("../repositories/UserRolesRepository"));
const handleError = (required, next, res) => {
    if (required) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
};
const JwtAuthMiddleware = (required = true, roleIds = [Roles_1.AssignableRoles.CUSTOMER]) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    const userRolesRepository = new UserRolesRepository_1.default();
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_SIGN_TOKEN, async (err, user) => {
            if (err) {
                return handleError(required, next, res);
            }
            else {
                const userHasRole = await userRolesRepository.existByRoleIdsAndUserId(roleIds, user.valueOf().id);
                if (!userHasRole) {
                    return handleError(required, next, res);
                }
            }
            req.user = user;
            next();
        });
    }
    else {
        return handleError(required, next, res);
    }
};
exports.default = JwtAuthMiddleware;
//# sourceMappingURL=JwtAuthMiddleware.js.map