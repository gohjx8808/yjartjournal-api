"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const promoCodeRepository_1 = require("../../repositories/promoCodeRepository");
const PromoCodeServicesa_1 = __importDefault(require("../../services/promoCode/PromoCodeServicesa"));
const VerifyPromoCodeMiddleware = () => async (req, res, next) => {
    const promoCodeServices = new PromoCodeServicesa_1.default();
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const existingPromoCode = await (0, promoCodeRepository_1.getPromoCodeByName)(payload.promoCode);
    const verificationResult = await promoCodeServices.validatePromoCode(existingPromoCode, user.id);
    if (!verificationResult.success) {
        return res.status(422).json({ message: verificationResult.message });
    }
    next();
};
exports.default = VerifyPromoCodeMiddleware;
//# sourceMappingURL=VerifyPromoCodeMiddleware.js.map