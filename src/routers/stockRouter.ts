import { Router } from 'express';
import multer from 'multer';
import AddNewStockValidator from '../requestValidators/stock/AddNewStockValidator';
import GetYarnStockValidator from '../requestValidators/stock/GetYarnStockValidator';
import UpdateStockQuantityValidator from '../requestValidators/stock/UpdateStockQuantityValidator';
import {
  AddNewYarnStockPayload,
  GetYarnStockPayload,
  UpdateYarnQuantityPayload,
} from '../services/stock/typings';
import YarnStockService from '../services/stock/yarnStockServices';

const stockRouter = Router();
const upload = multer();

const yarnStockService = new YarnStockService();

stockRouter.get('/yarn-categories', async (_req, res) => {
  const response = await yarnStockService.getAllYarnCategories();

  return res.json({ data: response });
});

stockRouter.get('/yarn-color-categories', async (_req, res) => {
  const response = await yarnStockService.getAllYarnColorCategories();

  return res.json({ data: response });
});

stockRouter.post<{}, any, AddNewYarnStockPayload>(
  '/add-new',
  ...[upload.none(), ...AddNewStockValidator],
  async (req, res) => {
    const payload = req.body;

    const response = await yarnStockService.insertNewYarnStock(payload);

    return res.json(response);
  },
);

stockRouter.get<{}, any, GetYarnStockPayload>(
  '/yarn-stocks',
  ...[upload.none(), ...GetYarnStockValidator],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.getAllYarnStock(payload);

    return res.json({ data: response });
  },
);

stockRouter.post<{}, any, UpdateYarnQuantityPayload>(
  '/update-quantity',
  ...[upload.none(), ...UpdateStockQuantityValidator],
  async (req, res) => {
    const payload = req.body;

    const response = await yarnStockService.updateYarnStockAmount(payload);

    if (!response.success) {
      return res.status(422).json({ message: response.msg });
    }
    return res.json(response);
  },
);

export default stockRouter;
