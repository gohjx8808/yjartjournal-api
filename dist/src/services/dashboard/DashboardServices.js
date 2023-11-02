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
        let categoryChart = {
            id: [],
            value: [],
            name: [],
        };
        let colorCategoryChart = {
            id: [],
            value: [],
            name: [],
        };
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
        const targetIndex = chart.id.findIndex((arr) => arr === compareData.id);
        if (targetIndex === -1) {
            chart.id.push(compareData.id);
            chart.name.push(compareData.name);
            chart.value.push(1);
        }
        else {
            chart.value[targetIndex] += 1;
        }
        return chart;
    }
}
exports.default = DashboardServices;
//# sourceMappingURL=DashboardServices.js.map