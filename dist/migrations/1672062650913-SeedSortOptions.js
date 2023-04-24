"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedSortOptions1672062650913 = void 0;
const dataSource_1 = require("../src/dataSource");
const SortOptions_1 = __importDefault(require("../src/entities/SortOptions"));
class SeedSortOptions1672062650913 {
    SortOptionsSeed = [
        {
            name: 'Name: A to Z',
        },
        {
            name: 'Name: Z to A',
        },
        {
            name: 'Price: Low to High',
        },
        {
            name: 'Price: High to Low',
        },
    ];
    async up() {
        await dataSource_1.dataSource.manager
            .getRepository(SortOptions_1.default)
            .save(this.SortOptionsSeed);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.SeedSortOptions1672062650913 = SeedSortOptions1672062650913;
//# sourceMappingURL=1672062650913-SeedSortOptions.js.map