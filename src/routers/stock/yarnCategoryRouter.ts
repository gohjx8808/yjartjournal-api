import { Router } from 'express';
import multer from 'multer';
import DeleteYarnCategoryMiddleware from '../../middlewares/stocks/yarnCategory/DeleteYarnCategoryMiddleware';
import UpdateYarnCategoryMiddleware from '../../middlewares/stocks/yarnCategory/UpdateYarnCategoryMiddleware';
import AddNewYarnCategoryValidator from '../../requestValidators/stock/yarnCategory/AddNewYarnCategoryValidator';
import DeleteYarnCategoryValidator from '../../requestValidators/stock/yarnCategory/DeleteYarnCategoryValidator';
import UpdateYarnCategoryValidator from '../../requestValidators/stock/yarnCategory/UpdateYarnCategoryValidator';
import {
  AddNewYarnCategoryPayload,
  DeleteYarnCategoryPayload,
  UpdateYarnCategoryPayload,
} from '../../services/stock/typings';
import YarnCategoryServices from '../../services/stock/YarnCategoryServices';
import JwtAuthMiddleware from '../../middlewares/JwtAuthMiddleware';
import { AssignableRoles } from '../../entities/Roles';

const yarnCategoryRouter = Router();
const upload = multer();

const yarnCategoryService = new YarnCategoryServices();

yarnCategoryRouter.get(
  '/',
  JwtAuthMiddleware(true, [AssignableRoles.ADMIN, AssignableRoles.ADMIN_VIEW]),
  async (_req, res) => {
    const response = await yarnCategoryService.getAllYarnCategories();

    return res.json({ data: response });
  },
);

yarnCategoryRouter.post<{}, any, AddNewYarnCategoryPayload>(
  '/add-new',
  ...[
    upload.none(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    ...AddNewYarnCategoryValidator,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.addNewYarnCategory(payload);

    return res.json({ data: response });
  },
);

yarnCategoryRouter.post<{}, any, UpdateYarnCategoryPayload>(
  '/update',
  ...[
    upload.none(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    ...UpdateYarnCategoryValidator,
    UpdateYarnCategoryMiddleware,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.updateYarnCategory(payload);

    return res.json({ data: response });
  },
);

yarnCategoryRouter.post<{}, any, DeleteYarnCategoryPayload>(
  '/delete',
  ...[
    upload.none(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    ...DeleteYarnCategoryValidator,
    DeleteYarnCategoryMiddleware,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.deleteYarnCategory(payload);

    return res.json({ data: response });
  },
);

export default yarnCategoryRouter;
