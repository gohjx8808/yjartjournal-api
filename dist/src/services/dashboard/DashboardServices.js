"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnStockRepository_1 = __importDefault(require("../../repositories/YarnStockRepository"));
const YarnColorCategoryRepository_1 = __importDefault(require("../../repositories/YarnColorCategoryRepository"));
const YarnCategoryRepository_1 = __importDefault(require("../../repositories/YarnCategoryRepository"));
class DashboardServices {
    yarnStockRepository = new YarnStockRepository_1.default();
    yarnColorCategoryRepository = new YarnColorCategoryRepository_1.default();
    yarnCategoryRepository = new YarnCategoryRepository_1.default();
    getStockCount = async () => {
        const yarnStocks = await this.yarnStockRepository.getAll();
        const totalYarn = 0;
        const totalReorderYarn = 0;
        return yarnStocks.reduce((accumulator, stock) => {
            accumulator.totalYarn += 1;
            if (stock.inStockQuantity < stock.reorderLevel) {
                accumulator.totalReorderYarn += 1;
            }
            return accumulator;
        }, {
            totalYarn,
            totalReorderYarn,
        });
    };
    getYarnCategoryCount = async () => {
        const yarnCategories = await this.yarnCategoryRepository.getAll();
        return yarnCategories.reduce((acc) => acc + 1, 0);
    };
    getYarnColorCategoryCount = async () => {
        const colorCategories = await this.yarnColorCategoryRepository.getAll();
        return colorCategories.reduce((acc) => acc + 1, 0);
    };
}
exports.default = DashboardServices;
//# sourceMappingURL=DashboardServices.js.map