"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const DeleteYarnCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnCategory/DeleteYarnCategoryMiddleware"));
const UpdateYarnCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnCategory/UpdateYarnCategoryMiddleware"));
const AddNewYarnCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnCategory/AddNewYarnCategoryValidator"));
const DeleteYarnCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnCategory/DeleteYarnCategoryValidator"));
const UpdateYarnCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnCategory/UpdateYarnCategoryValidator"));
const YarnCategoryServices_1 = __importDefault(require("../../services/stock/YarnCategoryServices"));
const yarnCategoryRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const yarnCategoryService = new YarnCategoryServices_1.default();
yarnCategoryRouter.get('/', async (_req, res) => {
    const response = await yarnCategoryService.getAllYarnCategories();
    return res.json({ data: response });
});
yarnCategoryRouter.post('/add-new', ...[upload.none(), ...AddNewYarnCategoryValidator_1.default], async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.addNewYarnCategory(payload);
    return res.json({ data: response });
});
yarnCategoryRouter.post('/update', ...[
    upload.none(),
    ...UpdateYarnCategoryValidator_1.default,
    UpdateYarnCategoryMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.updateYarnCategory(payload);
    return res.json({ data: response });
});
yarnCategoryRouter.post('/delete', ...[
    upload.none(),
    ...DeleteYarnCategoryValidator_1.default,
    DeleteYarnCategoryMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.deleteYarnCategory(payload);
    return res.json({ data: response });
});
exports.default = yarnCategoryRouter;
//# sourceMappingURL=yarnCategoryRouter.js.map