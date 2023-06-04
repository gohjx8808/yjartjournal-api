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
        const totalYarn = 0;
        const totalReorderYarn = 0;
        const categoryChart = [];
        const colorCategoryChart = [];
        const yarnStockOverview = yarnStocks.reduce((accumulator, stock) => {
            accumulator.totalYarn += 1;
            accumulator.categoryChart = this.formatChartData(accumulator.categoryChart, stock.yarnCategory);
            accumulator.colorCategoryChart = this.formatChartData(accumulator.colorCategoryChart, stock.yarnColorCategory);
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
    formatChartData(chart, compareData) {
        const targetIndex = chart.findIndex((arr) => arr.x === compareData.id);
        if (targetIndex !== -1) {
            const target = chart[targetIndex];
            chart[targetIndex] = {
                ...target,
                y: target.y + 1,
            };
        }
        else {
            let formattedName = compareData.name.replaceAll(' ', '\n');
            const sliceIndex = formattedName.indexOf('/');
            formattedName = `${formattedName.substring(0, sliceIndex + 1)}\n${formattedName.substring(sliceIndex + 1)}`;
            chart.push({
                x: compareData.id,
                y: 1,
                name: formattedName,
            });
        }
        return chart;
    }
}
exports.default = DashboardServices;
//# sourceMappingURL=DashboardServices.js.map