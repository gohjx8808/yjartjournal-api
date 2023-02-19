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
const promoCodeServices_1 = require("../../services/promoCode/promoCodeServices");
const VerifyPromoCodeMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const user = req.user.valueOf();
    const existingPromoCode = yield (0, promoCodeServices_1.getPromoCodeByName)(payload.promoCode);
    const verificationResult = yield (0, promoCodeServices_1.validatePromoCode)(existingPromoCode, user);
    if (!verificationResult.success) {
        return res.status(422).json({ message: verificationResult.message });
    }
    next();
});
exports.default = VerifyPromoCodeMiddleware;
//# sourceMappingURL=VerifyPromoCodeMiddleware.js.map