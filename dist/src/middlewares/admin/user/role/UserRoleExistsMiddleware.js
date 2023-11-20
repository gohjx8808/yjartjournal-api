"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRolesRepository_1 = __importDefault(require("../../../../repositories/UserRolesRepository"));
const UserRoleExistsMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const userRolesRepository = new UserRolesRepository_1.default();
    const userRoleExist = await userRolesRepository.existByUserRoleId(payload.userRoleId);
    if (!userRoleExist) {
        return res.status(404).json({ message: 'User role not exists.' });
    }
    next();
};
exports.default = UserRoleExistsMiddleware;
//# sourceMappingURL=UserRoleExistsMiddleware.js.map