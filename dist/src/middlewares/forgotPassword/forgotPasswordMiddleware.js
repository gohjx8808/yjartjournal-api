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
const userRepository_1 = require("../../repositories/userRepository");
const ForgotPasswordMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userDetails = yield (0, userRepository_1.getUserByEmail)(payload.email);
    if (userDetails) {
        return next();
    }
    return res
        .status(404)
        .json({ message: 'The email inserted is not in the system.' });
});
exports.default = ForgotPasswordMiddleware;
//# sourceMappingURL=forgotPasswordMiddleware.js.map