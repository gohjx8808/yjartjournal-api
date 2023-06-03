"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DashboardServices_1 = __importDefault(require("../services/dashboard/DashboardServices"));
const dashboardRouter = (0, express_1.Router)();
const dashboardServices = new DashboardServices_1.default();
dashboardRouter.get('/yarn-stock-overview', async (_req, res) => {
    const stockCount = await dashboardServices.getStockCount();
    return res.json({ data: stockCount });
});
dashboardRouter.get('/yarn-category-count', async (_req, res) => {
    const yarnCategoryCount = await dashboardServices.getYarnCategoryCount();
    return res.json({ data: yarnCategoryCount });
});
dashboardRouter.get('/yarn-color-category-count', async (_req, res) => {
    const yarnColorCategoryCount = await dashboardServices.getYarnColorCategoryCount();
    return res.json({ data: yarnColorCategoryCount });
});
exports.default = dashboardRouter;
//# sourceMappingURL=dashboardRouter.js.map