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
const dataSource_1 = require("../dataSource");
const cryptoHelper_1 = require("../helpers/cryptoHelper");
const SignInMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = yield dataSource_1.userRepository
        .createQueryBuilder()
        .where({ email: payload.email })
        .getOne();
    if (!user) {
        res.status(401).json({ message: 'User does not exist!' });
    }
    else {
        const decryptedPassword = (0, cryptoHelper_1.decrypt)(user.password, user.iv);
        if (decryptedPassword !== payload.password) {
            res.status(401).json({
                message: 'Your credentials are invalid! Please login with a valid username and password.',
            });
        }
        next();
    }
});
exports.default = SignInMiddleware;
//# sourceMappingURL=SignInMiddleware.js.map