"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepositorya_1 = __importDefault(require("../repositories/UserRepositorya"));
const SignUpMiddleware = () => async (req, res, next) => {
    const userRepository = new UserRepositorya_1.default();
    const payload = req.body;
    const userExist = await userRepository.getUserByEmail(payload.email);
    if (userExist) {
        return res.status(422).json({
            message: 'The provided email is already in use by an existing user. ' +
                'Please register using another email or login using the correct credentials.',
        });
    }
    next();
};
exports.default = SignUpMiddleware;
//# sourceMappingURL=SignUpMiddleware.js.map