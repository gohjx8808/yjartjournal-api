"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedPromoTypes1702252889920 = void 0;
const dataSource_1 = require("../src/dataSource");
const PromoTypes_1 = __importDefault(require("../src/entities/PromoTypes"));
class SeedPromoTypes1702252889920 {
    async up() {
        const promoTypesSeed = ['Percent', 'Amount'];
        promoTypesSeed.map(async (promoType) => {
            await dataSource_1.manager.getRepository(PromoTypes_1.default).insert({ name: promoType });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.SeedPromoTypes1702252889920 = SeedPromoTypes1702252889920;
//# sourceMappingURL=1702252889920-SeedPromoTypes.js.map