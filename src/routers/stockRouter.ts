import { Router } from 'express';
import YarnCategoryRepository from '../repositories/YarnCategoryRepository';

const stockRouter = Router();

const yarnCategoryRepository = new YarnCategoryRepository();

stockRouter.get('/yarn-categories', async (_req, res) => {
  const response = await yarnCategoryRepository.getAll();

  return res.json({ data: response });
});

export default stockRouter;
