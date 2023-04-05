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
exports.SeedYarnCategories1680409712499 = void 0;
const dataSource_1 = require("../src/dataSource");
const YarnCategories_1 = __importDefault(require("../src/entities/YarnCategories"));
class SeedYarnCategories1680409712499 {
    constructor() {
        this.yarnCategoriesSeed = [
            "5ply Cotton Yarn",
            "Chenille Velvet Yarn",
            "Coral Yarn",
        ];
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.yarnCategoriesSeed.map((category) => __awaiter(this, void 0, void 0, function* () {
                yield dataSource_1.manager.getRepository(YarnCategories_1.default).insert({ name: category });
            }));
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    down() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.SeedYarnCategories1680409712499 = SeedYarnCategories1680409712499;
//# sourceMappingURL=1680409712499-SeedYarnCategories.js.map