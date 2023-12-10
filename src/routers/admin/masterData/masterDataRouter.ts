import { Router } from 'express';
import yarnCategoryRouter from './yarnCategoryRouter';
import yarnColorCategoryRouter from './yarnColorCategoryRouter';

const masterDataRouter = Router();

masterDataRouter.use('/yarn-categories', yarnCategoryRouter);
masterDataRouter.use('/yarn-color-categories', yarnColorCategoryRouter);

export default masterDataRouter;
