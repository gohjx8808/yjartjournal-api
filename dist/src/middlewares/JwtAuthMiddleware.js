"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const handleError = (required, next, res) => {
    if (required) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    next();
};
const JwtAuthMiddleware = (required = true) => (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_SIGN_TOKEN, (err, user) => {
            if (err) {
                return handleError(required, next, res);
            }
            req.user = user;
            next();
        });
    }
    else {
        return handleError(required, next, res);
    }
};
exports.default = JwtAuthMiddleware;
//# sourceMappingURL=JwtAuthMiddleware.js.map