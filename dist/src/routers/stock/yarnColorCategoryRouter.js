"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const DeleteYarnColorCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnColorCategory/DeleteYarnColorCategoryMiddleware"));
const UpdateYarnColorCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnColorCategory/UpdateYarnColorCategoryMiddleware"));
const AddNewYarnColorCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnColorCategory/AddNewYarnColorCategoryValidator"));
const DeleteYarnColorCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnColorCategory/DeleteYarnColorCategoryValidator"));
const UpdateYarnColorCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnColorCategory/UpdateYarnColorCategoryValidator"));
const YarnColorCategoryServices_1 = __importDefault(require("../../services/stock/YarnColorCategoryServices"));
const Roles_1 = require("../../entities/Roles");
const JwtAuthMiddleware_1 = __importDefault(require("../../middlewares/JwtAuthMiddleware"));
const yarnColorCategoryRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const yarnColorCategoryServices = new YarnColorCategoryServices_1.default();
yarnColorCategoryRouter.get('/', (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN, Roles_1.AssignableRoles.ADMIN_VIEW]), async (_req, res) => {
    const response = await yarnColorCategoryServices.getAllYarnColorCategories();
    return res.json({ data: response });
});
yarnColorCategoryRouter.post('/add-new', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...AddNewYarnColorCategoryValidator_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnColorCategoryServices.addNewYarnCategory(payload);
    return res.json({ data: response });
});
yarnColorCategoryRouter.post('/update', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...UpdateYarnColorCategoryValidator_1.default,
    UpdateYarnColorCategoryMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnColorCategoryServices.updateYarnCategory(payload);
    return res.json({ data: response });
});
yarnColorCategoryRouter.post('/delete', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...DeleteYarnColorCategoryValidator_1.default,
    DeleteYarnColorCategoryMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnColorCategoryServices.deleteYarnCategory(payload);
    return res.json({ data: response });
});
exports.default = yarnColorCategoryRouter;
//# sourceMappingURL=yarnColorCategoryRouter.js.map