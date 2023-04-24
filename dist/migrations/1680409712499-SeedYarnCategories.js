"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedYarnCategories1680409712499 = void 0;
const dataSource_1 = require("../src/dataSource");
const YarnCategories_1 = __importDefault(require("../src/entities/YarnCategories"));
class SeedYarnCategories1680409712499 {
    yarnCategoriesSeed = [
        '5ply Cotton Yarn',
        'Chenille Velvet Yarn',
        'Coral Yarn',
    ];
    async up() {
        this.yarnCategoriesSeed.map(async (category) => {
            await dataSource_1.manager.getRepository(YarnCategories_1.default).insert({ name: category });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.SeedYarnCategories1680409712499 = SeedYarnCategories1680409712499;
//# sourceMappingURL=1680409712499-SeedYarnCategories.js.map