"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JwtAuthMiddleware_1 = __importDefault(require("../../../middlewares/JwtAuthMiddleware"));
const Roles_1 = require("../../../entities/Roles");
const PromoCodeServices_1 = __importDefault(require("../../../services/promoCode/PromoCodeServices"));
const promoCodeRouter = (0, express_1.Router)();
const promoCodeServices = new PromoCodeServices_1.default();
promoCodeRouter.get('/', (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN, Roles_1.AssignableRoles.ADMIN_VIEW]), async (req, res) => {
    const response = await promoCodeServices.getAll();
    return res.json({ data: response });
});
exports.default = promoCodeRouter;
//# sourceMappingURL=promoCodeRouter.js.map