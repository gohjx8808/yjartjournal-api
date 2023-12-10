import { Router } from 'express';
import adminUserRouter from './user/adminUserRouter';
import masterDataRouter from './masterData/masterDataRouter';

const adminRouter = Router();

adminRouter.use('/user', adminUserRouter);
adminRouter.use('/master-data', masterDataRouter);

export default adminRouter;
