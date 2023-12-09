"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const PromoCodeServices_1 = __importDefault(require("../../services/promoCode/PromoCodeServices"));
const VerifyPromoCodeMiddleware = () => async (req, res, next) => {
    const promoCodeServices = new PromoCodeServices_1.default();
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const verificationResult = await promoCodeServices.validatePromoCode(payload.promoCode, user.id);
    if (!verificationResult.success) {
        return res.status(422).json({ message: verificationResult.message });
    }
    next();
};
exports.default = VerifyPromoCodeMiddleware;
//# sourceMappingURL=VerifyPromoCodeMiddleware.js.map