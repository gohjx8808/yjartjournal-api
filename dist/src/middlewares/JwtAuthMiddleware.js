"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const JwtAuthMiddleware = () => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_SIGN_TOKEN, (err, user) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized!' });
            }
            req.user = user;
            next();
        });
    }
    else {
        res.status(401).json({ message: 'Unauthorized!' });
    }
};
exports.default = JwtAuthMiddleware;
//# sourceMappingURL=JwtAuthMiddleware.js.map