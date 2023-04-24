"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPasswordRepository_1 = require("../../repositories/forgotPasswordRepository");
const ResetPasswordMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const tokenDetails = await (0, forgotPasswordRepository_1.getResetPasswordEntryByToken)(payload.token);
    if (!tokenDetails) {
        return res.status(404).json({ message: 'Invalid token.' });
    }
    if (tokenDetails.expiredAt < new Date()) {
        return res.status(410).json({
            message: 'The token is expired. Please request for a new token.',
        });
    }
    if (tokenDetails.isUsed) {
        return res.status(410).json({
            message: 'The token is used. Please request for a new token.',
        });
    }
    return next();
};
exports.default = ResetPasswordMiddleware;
//# sourceMappingURL=ResetPasswordMiddleware.js.map