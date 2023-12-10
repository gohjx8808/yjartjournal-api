import { Router } from 'express';
import adminUserRouter from './user/adminUserRouter';

const adminRouter = Router();

adminRouter.use('/user', adminUserRouter);

export default adminRouter;
