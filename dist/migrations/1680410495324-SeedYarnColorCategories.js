"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedYarnColorCategories1680410495324 = void 0;
const dataSource_1 = require("../src/dataSource");
const YarnColorCategories_1 = __importDefault(require("../src/entities/YarnColorCategories"));
class SeedYarnColorCategories1680410495324 {
    constructor() {
        this.yarnColorCategoriesSeed = [
            'White/Yellow',
            'Brown/Grey',
            'Pink/Red',
            'Purple/Blue',
            'Green',
        ];
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.yarnColorCategoriesSeed.map((color) => __awaiter(this, void 0, void 0, function* () {
                yield dataSource_1.manager.getRepository(YarnColorCategories_1.default).insert({ name: color });
            }));
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    down() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.SeedYarnColorCategories1680410495324 = SeedYarnColorCategories1680410495324;
//# sourceMappingURL=1680410495324-SeedYarnColorCategories.js.map