import { Router } from 'express';
import YarnCategoryRepository from '../repositories/YarnCategoryRepository';
import YarnColorCategoryRepository from '../repositories/YarnColorCategoryRepository';

const stockRouter = Router();

const yarnCategoryRepository = new YarnCategoryRepository();
const yarnColorCategoryRepository = new YarnColorCategoryRepository();

stockRouter.get('/yarn-categories', async (_req, res) => {
  const response = await yarnCategoryRepository.getAll();

  return res.json({ data: response });
});

stockRouter.get('/yarn-color-categories', async (_req, res) => {
  const response = await yarnColorCategoryRepository.getAll();
  
  return res.json({ data: response });
});

export default stockRouter;
