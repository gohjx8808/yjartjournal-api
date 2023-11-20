"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RoleRepository_1 = __importDefault(require("../../../../repositories/RoleRepository"));
const RoleExistsMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const rolesRepository = new RoleRepository_1.default();
    const roleExist = await rolesRepository.findById(payload.roleId);
    if (!roleExist) {
        return res.status(404).json({ message: 'Role not exists.' });
    }
    next();
};
exports.default = RoleExistsMiddleware;
//# sourceMappingURL=RoleExistsMiddleware.js.map