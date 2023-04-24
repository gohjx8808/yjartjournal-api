"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../repositories/userRepository");
const SignUpMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const userExist = await (0, userRepository_1.getUserByEmail)(payload.email);
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