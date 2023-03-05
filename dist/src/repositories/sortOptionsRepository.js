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
exports.getSortOptions = void 0;
const dataSource_1 = require("../dataSource");
const SortOptions_1 = __importDefault(require("../entities/SortOptions"));
const sortOptionsManager = dataSource_1.manager.getRepository(SortOptions_1.default);
const getSortOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = yield sortOptionsManager.find();
    return sortData;
});
exports.getSortOptions = getSortOptions;
//# sourceMappingURL=sortOptionsRepository.js.map