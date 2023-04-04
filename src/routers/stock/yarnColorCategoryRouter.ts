import { Router } from 'express';
import multer from 'multer';
import YarnColorCategoryServices from '../../services/stock/YarnColorCategoryServices';

const yarnColorCategoryRouter = Router();
const upload = multer();

const yarnColorCategoryServices = new YarnColorCategoryServices();

yarnColorCategoryRouter.get('/', async (_req, res) => {
  const response = await yarnColorCategoryServices.getAllYarnColorCategories();

  return res.json({ data: response });
});

export default yarnColorCategoryRouter;
