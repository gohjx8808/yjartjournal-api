import { Router } from "express";
import multer from "multer";
import DeleteYarnColorCategoryMiddleware from "../../middlewares/stocks/yarnColorCategory/DeleteYarnColorCategoryMiddleware";
import UpdateYarnColorCategoryMiddleware from "../../middlewares/stocks/yarnColorCategory/UpdateYarnColorCategoryMiddleware";
import AddNewYarnColorCategoryValidator from "../../requestValidators/stock/yarnColorCategory/AddNewYarnColorCategoryValidator";
import DeleteYarnColorCategoryValidator from "../../requestValidators/stock/yarnColorCategory/DeleteYarnColorCategoryValidator";
import UpdateYarnColorCategoryValidator from "../../requestValidators/stock/yarnColorCategory/UpdateYarnColorCategoryValidator";
import {
  AddNewYarnColorCategoryPayload,
  DeleteYarnColorCategoryPayload,
  UpdateYarnColorCategoryPayload,
} from "../../services/stock/typings";
import YarnColorCategoryServices from "../../services/stock/YarnColorCategoryServices";

const yarnColorCategoryRouter = Router();
const upload = multer();

const yarnColorCategoryServices = new YarnColorCategoryServices();

yarnColorCategoryRouter.get("/", async (_req, res) => {
  const response = await yarnColorCategoryServices.getAllYarnColorCategories();

  return res.json({ data: response });
});

yarnColorCategoryRouter.post<{}, any, AddNewYarnColorCategoryPayload>(
  "/add-new",
  ...[upload.none(), ...AddNewYarnColorCategoryValidator],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnColorCategoryServices.addNewYarnCategory(
      payload
    );

    return res.json({ data: response });
  }
);

yarnColorCategoryRouter.post<{}, any, UpdateYarnColorCategoryPayload>(
  "/update",
  ...[
    upload.none(),
    ...UpdateYarnColorCategoryValidator,
    UpdateYarnColorCategoryMiddleware,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnColorCategoryServices.updateYarnCategory(
      payload
    );

    return res.json({ data: response });
  }
);

yarnColorCategoryRouter.post<{}, any, DeleteYarnColorCategoryPayload>(
  "/delete",
  ...[
    upload.none(),
    ...DeleteYarnColorCategoryValidator,
    DeleteYarnColorCategoryMiddleware,
  ],
  async (req, res) => {
    const payload = req.body;
    const response = await yarnColorCategoryServices.deleteYarnCategory(
      payload
    );

    return res.json({ data: response });
  }
);

export default yarnColorCategoryRouter;
