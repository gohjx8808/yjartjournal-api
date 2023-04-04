import { Router } from 'express';
import multer from 'multer';
import UpdateYarnCategoryMiddleware from '../../middlewares/stocks/UpdateYarnCategoryMiddleware';
import AddNewYarnCategoryValidator from '../../requestValidators/stock/yarnCategory/AddNewYarnCategoryValidator';
import UpdateYarnCategoryValidator from '../../requestValidators/stock/yarnCategory/UpdateYarnCategoryValidator';
import { AddNewYarnCategoryPayload, UpdateYarnCategoryPayload } from '../../services/stock/typings';
import YarnCategoryServices from '../../services/stock/YarnCategoryServices';

const yarnCategoryRouter = Router();
const upload = multer();

const yarnCategoryService = new YarnCategoryServices();

yarnCategoryRouter.get('/', async (_req, res) => {
  const response = await yarnCategoryService.getAllYarnCategories();

  return res.json({ data: response });
});

yarnCategoryRouter.post<{}, any, AddNewYarnCategoryPayload>(
  '/add-new',
  ...[upload.none(), ...AddNewYarnCategoryValidator],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.addNewYarnCategory(payload);

    return res.json({ data: response });
  },
);

yarnCategoryRouter.post<{}, any, UpdateYarnCategoryPayload>(
  '/update',
  ...[upload.none(), ...UpdateYarnCategoryValidator, UpdateYarnCategoryMiddleware],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.updateYarnCategory(payload);

    return res.json({ data: response });
  },
);

export default yarnCategoryRouter;
