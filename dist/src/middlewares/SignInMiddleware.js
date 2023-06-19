"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoHelper_1 = require("../helpers/cryptoHelper");
const userRepository_1 = require("../repositories/userRepository");
const UserRolesRepository_1 = __importDefault(require("../repositories/UserRolesRepository"));
const RoleRepository_1 = __importDefault(require("../repositories/RoleRepository"));
const SignInMiddleware = () => async (req, res, next) => {
    const userRoleRepository = new UserRolesRepository_1.default();
    const roleRepository = new RoleRepository_1.default();
    const payload = req.body;
    const user = await (0, userRepository_1.getUserByEmail)(payload.email);
    if (!user) {
        return res.status(401).json({ message: 'User does not exist!' });
    }
    else {
        const decryptedPassword = (0, cryptoHelper_1.decrypt)(user.password, user.iv);
        if (decryptedPassword !== payload.password) {
            return res.status(401).json({
                message: 'Your credentials are invalid! Please login with a valid username and password.',
            });
        }
        const role = await roleRepository.findById(payload.role);
        if (!role) {
            return res.status(404).json({ message: 'Invalid role!' });
        }
        else {
            const userHaveRole = await userRoleRepository.existByRoleIdAndUserId(role.id, user.id);
            if (!userHaveRole) {
                return res.status(401).json({ message: 'You are not permitted!' });
            }
        }
        next();
    }
};
exports.default = SignInMiddleware;
//# sourceMappingURL=SignInMiddleware.js.map