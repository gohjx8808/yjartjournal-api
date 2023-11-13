"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../../../repositories/UserRepository"));
const UserExistsMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const userRepository = new UserRepository_1.default();
    const userExist = await userRepository.getUserById(payload.userId);
    if (!userExist) {
        return res.status(404).json({ message: 'User not exists.' });
    }
    next();
};
exports.default = UserExistsMiddleware;
//# sourceMappingURL=UserExistsMiddleware.js.map