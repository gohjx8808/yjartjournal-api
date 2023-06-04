import { Router } from 'express';
import DashboardServices from '../services/dashboard/DashboardServices';

const dashboardRouter = Router();

const dashboardServices = new DashboardServices();

dashboardRouter.get('/yarn-stock-overview', async (_req, res) => {
  const yarnStockOverview = await dashboardServices.getYarnStockOverview();

  return res.json({ data: yarnStockOverview });
});

export default dashboardRouter;
