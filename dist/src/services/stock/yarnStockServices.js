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
const YarnCategoryRepository_1 = __importDefault(require("../../repositories/YarnCategoryRepository"));
const YarnColorCategoryRepository_1 = __importDefault(require("../../repositories/YarnColorCategoryRepository"));
const YarnStockRepository_1 = __importDefault(require("../../repositories/YarnStockRepository"));
class YarnStockService {
    constructor() {
        this.yarnStockRepository = new YarnStockRepository_1.default();
        this.yarnCategoryRepository = new YarnCategoryRepository_1.default();
        this.yarnColorCategoryRepository = new YarnColorCategoryRepository_1.default();
        this.insertNewYarnStock = (payload) => __awaiter(this, void 0, void 0, function* () {
            const res = yield this.yarnStockRepository.insertNewYarnStock(payload);
            return res;
        });
        this.getAllYarnStock = (payload) => __awaiter(this, void 0, void 0, function* () {
            const yarnStocks = yield this.yarnStockRepository.getAll();
            let filtered = yarnStocks;
            if (payload.yarnCategoryIds.length > 0) {
                filtered = yarnStocks.filter((stock) => payload.yarnCategoryIds.includes(stock.yarnCategory.id));
            }
            if (payload.yarnColorCategoryIds.length > 0) {
                filtered = yarnStocks.filter((stock) => payload.yarnColorCategoryIds.includes(stock.yarnColorCategory.id));
            }
            return filtered;
        });
        this.getAllYarnCategories = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnCategoryRepository.getAll();
            return response;
        });
        this.getAllYarnColorCategories = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnColorCategoryRepository.getAll();
            return response;
        });
    }
}
exports.default = YarnStockService;
//# sourceMappingURL=yarnStockServices.js.map