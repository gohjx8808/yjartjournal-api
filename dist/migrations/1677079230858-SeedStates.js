"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedStates1677079230858 = void 0;
const dataSource_1 = require("../src/dataSource");
const States_1 = __importDefault(require("../src/entities/States"));
class SeedStates1677079230858 {
    states = [
        'Perlis',
        'Penang',
        'Kedah',
        'Perak',
        'Pahang',
        'Selangor',
        'Negeri Sembilan',
        'Melaka',
        'Johor',
        'Kelantan',
        'Terengganu',
        'Sabah',
        'Sarawak',
        'Wilayah Persekutuan Kuala Lumpur',
        'Wilayah Persekutuan Labuan',
    ];
    async up() {
        this.states.map(async (state) => {
            await dataSource_1.manager.getRepository(States_1.default).insert({ name: state });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.SeedStates1677079230858 = SeedStates1677079230858;
//# sourceMappingURL=1677079230858-SeedStates.js.map