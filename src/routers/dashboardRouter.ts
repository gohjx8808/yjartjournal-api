import { Router } from 'express';
import DashboardServices from '../services/dashboard/dashboardServices';

const dashboardRouter = Router();

const dashboardServices = new DashboardServices();

dashboardRouter.get('/yarn-stock-count', async (_req, res) => {
  const stockCount = await dashboardServices.getStockCount();

  return res.json({ data: stockCount });
});

dashboardRouter.get('/yarn-category-count', async (_req, res) => {
  const yarnCategoryCount = await dashboardServices.getYarnCategoryCount();

  return res.json({ data: yarnCategoryCount });
});

dashboardRouter.get('/yarn-color-category-count', async (_req, res) => {
  const yarnColorCategoryCount =
    await dashboardServices.getYarnColorCategoryCount();

  return res.json({ data: yarnColorCategoryCount });
});

export default dashboardRouter;
