"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const UniqueEmailMiddleware = () => async (req, res, next) => {
    const userRepository = new UserRepository_1.default();
    const payload = req.body;
    const userExist = await userRepository.getUserByEmail(payload.email);
    if (userExist) {
        return res.status(422).json({
            message: 'Same email exists.',
        });
    }
    next();
};
exports.default = UniqueEmailMiddleware;
//# sourceMappingURL=UniqueEmailMiddleware.js.map