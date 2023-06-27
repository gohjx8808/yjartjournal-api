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
const JwtAuthMiddleware_1 = __importDefault(require("../../middlewares/JwtAuthMiddleware"));
const Roles_1 = require("../../entities/Roles");
const yarnCategoryRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const yarnCategoryService = new YarnCategoryServices_1.default();
yarnCategoryRouter.get('/', (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN, Roles_1.AssignableRoles.ADMIN_VIEW]), async (_req, res) => {
    const response = await yarnCategoryService.getAllYarnCategories();
    return res.json({ data: response });
});
yarnCategoryRouter.post('/add-new', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...AddNewYarnCategoryValidator_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.addNewYarnCategory(payload);
    return res.json({ data: response });
});
yarnCategoryRouter.post('/update', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...UpdateYarnCategoryValidator_1.default,
    UpdateYarnCategoryMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.updateYarnCategory(payload);
    return res.json({ data: response });
});
yarnCategoryRouter.post('/delete', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...DeleteYarnCategoryValidator_1.default,
    DeleteYarnCategoryMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnCategoryService.deleteYarnCategory(payload);
    return res.json({ data: response });
});
exports.default = yarnCategoryRouter;
//# sourceMappingURL=yarnCategoryRouter.js.map