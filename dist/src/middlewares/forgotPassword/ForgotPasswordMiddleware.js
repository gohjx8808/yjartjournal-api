"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../../repositories/userRepository");
const ForgotPasswordMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const userDetails = await (0, userRepository_1.getUserByEmail)(payload.email);
    if (userDetails) {
        return next();
    }
    return res
        .status(404)
        .json({ message: 'The email inserted is not in the system.' });
};
exports.default = ForgotPasswordMiddleware;
//# sourceMappingURL=ForgotPasswordMiddleware.js.map