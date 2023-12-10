import { Router } from 'express';
import yarnCategoryRouter from './yarnCategoryRouter';
import yarnColorCategoryRouter from './yarnColorCategoryRouter';
import promoCodeRouter from './promoCodeRouter';

const masterDataRouter = Router();

masterDataRouter.use('/yarn-categories', yarnCategoryRouter);
masterDataRouter.use('/yarn-color-categories', yarnColorCategoryRouter);
masterDataRouter.use('/promo-codes', promoCodeRouter);

export default masterDataRouter;
