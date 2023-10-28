import { Router } from 'express';
import multer from 'multer';
import { AssignableRoles } from '../../entities/Roles';
import JwtAuthMiddleware from '../../middlewares/JwtAuthMiddleware';
import AddYarnStockMiddleware from '../../middlewares/stocks/yarnStock/AddYarnStockMiddleware';
import DeleteYarnStockMiddleware from '../../middlewares/stocks/yarnStock/DeleteYarnStockMiddleware';
import UpdateYarnStockMiddleware from '../../middlewares/stocks/yarnStock/UpdateYarnStockMiddleware';
import AddNewStockValidator from '../../requestValidators/stock/yarnStock/AddNewStockValidator';
import DeleteYarnStockValidator from '../../requestValidators/stock/yarnStock/DeleteYarnStockValidator';
import GetYarnStockValidator from '../../requestValidators/stock/yarnStock/GetYarnStockValidator';
import UpdateStockQuantityValidator from '../../requestValidators/stock/yarnStock/UpdateStockQuantityValidator';
import UpdateStockValidator from '../../requestValidators/stock/yarnStock/UpdateStockValidator';
import YarnStockServices from '../../services/stock/YarnStockServices';
import {
  AddNewYarnStockPayload,
  DeleteYarnStockPayload,
  GetYarnStockPayload,
  UpdateYarnQuantityPayload,
  UpdateYarnStockPayload,
} from '../../services/stock/typings';
import yarnCategoryRouter from './yarnCategoryRouter';
import yarnColorCategoryRouter from './yarnColorCategoryRouter';

const stockRouter = Router();
const upload = multer();

const yarnStockService = new YarnStockServices();

stockRouter.use('/yarn-categories', yarnCategoryRouter);

stockRouter.use('/yarn-color-categories', yarnColorCategoryRouter);

stockRouter.post<{}, any, AddNewYarnStockPayload>(
  '/add-new',
  ...[
    upload.single('image'),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    ...AddNewStockValidator,
    AddYarnStockMiddleware,
  ],
  async (req, res) => {
    const payload = req.body;
    const uploadedFile = req.file;
    const response = await yarnStockService.insertNewYarnStock(
      payload,
      uploadedFile,
    );

    return res.json(response);
  },
);

stockRouter.post<{}, any, GetYarnStockPayload>(
  '/yarn-stocks',
  ...[
    upload.none(),
    JwtAuthMiddleware(true, [
      AssignableRoles.ADMIN,
      AssignableRoles.ADMIN_VIEW,
    ]),
    ...GetYarnStockValidator,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.getAllYarnStock(payload);

    return res.json({ data: response });
  },
);

stockRouter.post<{}, any, UpdateYarnQuantityPayload>(
  '/update-quantity',
  ...[
    upload.none(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    ...UpdateStockQuantityValidator,
  ],
  async (req, res) => {
    const payload = req.body;

    const response = await yarnStockService.updateYarnStockAmount(payload);

    if (!response.success) {
      return res.status(422).json({ message: response.msg });
    }
    return res.json(response);
  },
);

stockRouter.post<{}, any, DeleteYarnStockPayload>(
  '/delete',
  ...[
    upload.none(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    ...DeleteYarnStockValidator,
    DeleteYarnStockMiddleware,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.deleteYarnStock(payload);

    return res.json(response);
  },
);

stockRouter.post<{}, any, UpdateYarnStockPayload>(
  '/update',
  ...[
    upload.none(),
    JwtAuthMiddleware(true, [AssignableRoles.ADMIN]),
    ...UpdateStockValidator,
    UpdateYarnStockMiddleware,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.updateYarnStock(payload);

    return res.json(response);
  },
);

export default stockRouter;
