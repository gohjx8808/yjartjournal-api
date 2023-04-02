import { Router } from 'express';
import multer from 'multer';
import YarnCategoryRepository from '../repositories/YarnCategoryRepository';
import YarnColorCategoryRepository from '../repositories/YarnColorCategoryRepository';
import YarnStockRepository from '../repositories/YarnStockRepository';
import AddNewStockValidator from '../requestValidators/stock/AddNewStockValidator';
import { AddNewYarnStockPayload } from '../services/stock/typings';

const stockRouter = Router();
const upload = multer();

const yarnCategoryRepository = new YarnCategoryRepository();
const yarnColorCategoryRepository = new YarnColorCategoryRepository();
const yarnStockRepository = new YarnStockRepository();

stockRouter.get('/yarn-categories', async (_req, res) => {
  const response = await yarnCategoryRepository.getAll();

  return res.json({ data: response });
});

stockRouter.get('/yarn-color-categories', async (_req, res) => {
  const response = await yarnColorCategoryRepository.getAll();

  return res.json({ data: response });
});

stockRouter.post<{}, any, AddNewYarnStockPayload>(
  '/add-new',
  ...[upload.none(), ...AddNewStockValidator],
  async (req, res) => {
    const payload = req.body;

    const response = await yarnStockRepository.insertNewYarnStock(payload);

    return res.json(response);
  },
);

export default stockRouter;
