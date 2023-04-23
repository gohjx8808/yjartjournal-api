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
const YarnStockRepository_1 = __importDefault(require("../../repositories/YarnStockRepository"));
class YarnStockServices {
    constructor() {
        this.yarnStockRepository = new YarnStockRepository_1.default();
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
                filtered = filtered.filter((stock) => payload.yarnColorCategoryIds.includes(stock.yarnColorCategory.id));
            }
            const formattedStockData = filtered.map((stock) => {
                if (stock.inStockQuantity < stock.reorderLevel) {
                    return Object.assign(Object.assign({}, stock), { reorderStatus: 'Reorder' });
                }
                return Object.assign(Object.assign({}, stock), { reorderStatus: 'Optimum' });
            });
            return formattedStockData;
        });
        this.updateYarnStockAmount = (payload) => __awaiter(this, void 0, void 0, function* () {
            const currentYarnStock = yield this.yarnStockRepository.getById(payload.yarnId);
            if (!currentYarnStock) {
                return { msg: 'Invalid yarn id.', success: false };
            }
            const currentQuantity = currentYarnStock.inStockQuantity;
            let currentUsedQuantity = currentYarnStock.usedQuantity;
            if (payload.quantity < currentQuantity) {
                currentUsedQuantity += currentQuantity - payload.quantity;
            }
            const response = yield this.yarnStockRepository.updateQuantity(payload.yarnId, payload.quantity, currentUsedQuantity);
            return { response, success: true };
        });
        this.deleteYarnStock = (payload) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnStockRepository.deleteYarnStock(payload.yarnId);
            return response;
        });
        this.updateYarnStock = (payload) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnStockRepository.updateYarnStock(payload);
            return response;
        });
    }
}
exports.default = YarnStockServices;
//# sourceMappingURL=YarnStockServices.js.map