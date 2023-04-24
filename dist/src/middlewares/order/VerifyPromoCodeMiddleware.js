"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharedHelper_1 = require("../../helpers/sharedHelper");
const promoCodeRepository_1 = require("../../repositories/promoCodeRepository");
const promoCodeServices_1 = require("../../services/promoCode/promoCodeServices");
const VerifyPromoCodeMiddleware = () => async (req, res, next) => {
    const payload = req.body;
    const user = (0, sharedHelper_1.typeAuthenticatedUser)(req);
    const existingPromoCode = await (0, promoCodeRepository_1.getPromoCodeByName)(payload.promoCode);
    const verificationResult = await (0, promoCodeServices_1.validatePromoCode)(existingPromoCode, user.id);
    if (!verificationResult.success) {
        return res.status(422).json({ message: verificationResult.message });
    }
    next();
};
exports.default = VerifyPromoCodeMiddleware;
//# sourceMappingURL=VerifyPromoCodeMiddleware.js.map