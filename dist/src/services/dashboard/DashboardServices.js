"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnCategoryRepository_1 = __importDefault(require("../../repositories/YarnCategoryRepository"));
const YarnColorCategoryRepository_1 = __importDefault(require("../../repositories/YarnColorCategoryRepository"));
const YarnStockRepository_1 = __importDefault(require("../../repositories/YarnStockRepository"));
class DashboardServices {
    yarnStockRepository = new YarnStockRepository_1.default();
    yarnColorCategoryRepository = new YarnColorCategoryRepository_1.default();
    yarnCategoryRepository = new YarnCategoryRepository_1.default();
    getYarnStockOverview = async () => {
        const yarnStocks = await this.yarnStockRepository.getAll();
        const yarnCategories = await this.yarnCategoryRepository.getAll();
        const yarnColorCategories = await this.yarnColorCategoryRepository.getAll();
        const categoryChart = yarnCategories.map((category) => {
            return { x: category.name, y: 0 };
        });
        const colorCategoryChart = yarnColorCategories.map((colorCategory) => {
            return { x: colorCategory.name, y: 0 };
        });
        const totalYarn = 0;
        const totalReorderYarn = 0;
        const yarnStockOverview = yarnStocks.reduce((accumulator, stock) => {
            accumulator.totalYarn += 1;
            const targetCategoryIndex = categoryChart.findIndex((arr) => arr.x === stock.yarnCategory.name);
            const targetCategory = categoryChart[targetCategoryIndex];
            accumulator.categoryChart[targetCategoryIndex] = {
                ...targetCategory,
                y: targetCategory.y + 1,
            };
            const targetColorCategoryIndex = colorCategoryChart.findIndex((arr) => arr.x === stock.yarnColorCategory.name);
            const targetColorCategory = colorCategoryChart[targetColorCategoryIndex];
            accumulator.colorCategoryChart[targetColorCategoryIndex] = {
                ...targetColorCategory,
                y: targetColorCategory.y + 1,
            };
            if (stock.inStockQuantity < stock.reorderLevel) {
                accumulator.totalReorderYarn += 1;
            }
            return accumulator;
        }, {
            totalYarn,
            totalReorderYarn,
            categoryChart,
            colorCategoryChart,
        });
        return {
            yarnStockOverview,
            categoryCount: yarnCategories.reduce((acc) => acc + 1, 0),
            colorCategoryCount: yarnColorCategories.reduce((acc) => acc + 1, 0),
        };
    };
}
exports.default = DashboardServices;
//# sourceMappingURL=DashboardServices.js.map