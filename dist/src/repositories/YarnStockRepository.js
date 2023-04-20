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
const dataSource_1 = require("../dataSource");
const YarnStocks_1 = __importDefault(require("../entities/YarnStocks"));
const yarnStockManager = dataSource_1.manager.getRepository(YarnStocks_1.default);
class YarnStockRepository {
    constructor() {
        this.insertNewYarnStock = (payload) => __awaiter(this, void 0, void 0, function* () {
            return yarnStockManager.insert(Object.assign(Object.assign({}, payload), { costPerItem: payload.cost, inStockQuantity: payload.quantity, lastOrderedAt: payload.lastOrderedDate }));
        });
        this.getAll = () => yarnStockManager.find({
            relations: ['yarnColorCategory', 'yarnCategory'],
        });
        this.updateQuantity = (yarnId, inStockQuantity, usedQuantity) => yarnStockManager.update({ id: yarnId }, { inStockQuantity, usedQuantity });
        this.getById = (yarnId) => yarnStockManager.findOne({
            where: { id: yarnId },
            relations: ['yarnColorCategory', 'yarnCategory'],
        });
        this.getByCategoryColorCategoryDetailedColor = (yarnCategory, yarnColorCategory, detailedColor) => yarnStockManager.findOneBy({
            yarnCategory: { id: yarnCategory.id },
            yarnColorCategory: { id: yarnColorCategory.id },
            detailedColor,
        });
        this.getByYarnCategoryId = (yarnCategoryId) => yarnStockManager.findOneBy({ yarnCategory: { id: yarnCategoryId } });
        this.getByYarnColorCategoryId = (yarnColorCategoryId) => yarnStockManager.findOneBy({
            yarnColorCategory: { id: yarnColorCategoryId },
        });
        this.deleteYarnStock = (yarnStockId) => yarnStockManager.delete({ id: yarnStockId });
    }
}
exports.default = YarnStockRepository;
//# sourceMappingURL=YarnStockRepository.js.map