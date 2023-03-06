"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromoCodeByName = void 0;
const dataSource_1 = require("../dataSource");
const PromoCodes_1 = __importDefault(require("../entities/PromoCodes"));
const promoCodeManager = dataSource_1.manager.getRepository(PromoCodes_1.default);
const getPromoCodeByName = (promoCode) => promoCodeManager.findOneBy({
    name: promoCode,
});
exports.getPromoCodeByName = getPromoCodeByName;
//# sourceMappingURL=promoCodeRepository.js.map