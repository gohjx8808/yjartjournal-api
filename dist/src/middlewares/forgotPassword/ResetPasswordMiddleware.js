"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPasswordRepository_1 = require("../../repositories/forgotPasswordRepository");
const ResetPasswordMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const tokenDetails = yield (0, forgotPasswordRepository_1.getResetPasswordEntryByToken)(payload.token);
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
});
exports.default = ResetPasswordMiddleware;
//# sourceMappingURL=ResetPasswordMiddleware.js.map