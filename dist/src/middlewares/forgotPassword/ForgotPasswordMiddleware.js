"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositorya_1 = __importDefault(require("../../repositories/UserRepositorya"));
const ForgotPasswordMiddleware = () => async (req, res, next) => {
    const userRepository = new UserRepositorya_1.default();
    const payload = req.body;
    const userDetails = await userRepository.getUserByEmail(payload.email);
    if (userDetails) {
        return next();
    }
    return res
        .status(404)
        .json({ message: 'The email inserted is not in the system.' });
};
exports.default = ForgotPasswordMiddleware;
//# sourceMappingURL=ForgotPasswordMiddleware.js.map