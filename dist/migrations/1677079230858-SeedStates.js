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
exports.SeedStates1677079230858 = void 0;
const dataSource_1 = require("../src/dataSource");
const States_1 = __importDefault(require("../src/entities/States"));
class SeedStates1677079230858 {
    constructor() {
        this.states = [
            "Perlis",
            "Penang",
            "Kedah",
            "Perak",
            "Pahang",
            "Selangor",
            "Negeri Sembilan",
            "Melaka",
            "Johor",
            "Kelantan",
            "Terengganu",
            "Sabah",
            "Sarawak",
            "Wilayah Persekutuan Kuala Lumpur",
            "Wilayah Persekutuan Labuan",
        ];
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.states.map((state) => __awaiter(this, void 0, void 0, function* () {
                yield dataSource_1.manager.getRepository(States_1.default).insert({ name: state });
            }));
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    down() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.SeedStates1677079230858 = SeedStates1677079230858;
//# sourceMappingURL=1677079230858-SeedStates.js.map