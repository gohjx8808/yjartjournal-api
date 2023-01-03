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
exports.SeedSortOptions1672062650913 = void 0;
const dataSource_1 = require("../src/dataSource");
const SortOptions_1 = __importDefault(require("../src/entities/SortOptions"));
class SeedSortOptions1672062650913 {
    constructor() {
        this.SortOptionsSeed = [
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
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield dataSource_1.dataSource.manager.getRepository(SortOptions_1.default).save(this.SortOptionsSeed);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    down() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.SeedSortOptions1672062650913 = SeedSortOptions1672062650913;
//# sourceMappingURL=1672062650913-SeedSortOptions.js.map