"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cryptoHelper_1 = require("../helpers/cryptoHelper");
const userRepository_1 = require("../repositories/userRepository");
const SignInMiddleware = () => async (req, res, next) => {
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
        next();
    }
};
exports.default = SignInMiddleware;
//# sourceMappingURL=SignInMiddleware.js.map