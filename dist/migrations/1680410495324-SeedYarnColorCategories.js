"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedYarnColorCategories1680410495324 = void 0;
const dataSource_1 = require("../src/dataSource");
const YarnColorCategories_1 = __importDefault(require("../src/entities/YarnColorCategories"));
class SeedYarnColorCategories1680410495324 {
    yarnColorCategoriesSeed = [
        'White/Yellow',
        'Brown/Grey',
        'Pink/Red',
        'Purple/Blue',
        'Green',
    ];
    async up() {
        this.yarnColorCategoriesSeed.map(async (color) => {
            await dataSource_1.manager.getRepository(YarnColorCategories_1.default).insert({ name: color });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.SeedYarnColorCategories1680410495324 = SeedYarnColorCategories1680410495324;
//# sourceMappingURL=1680410495324-SeedYarnColorCategories.js.map