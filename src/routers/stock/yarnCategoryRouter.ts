import { Router } from 'express';
import multer from 'multer';
import YarnCategoryServices from '../../services/stock/YarnCategoryServices';

const yarnCategoryRouter = Router();
const upload = multer();

const yarnCategoryService = new YarnCategoryServices();

yarnCategoryRouter.get('/', async (_req, res) => {
  const response = await yarnCategoryService.getAllYarnCategories();

  return res.json({ data: response });
});

export default yarnCategoryRouter;
