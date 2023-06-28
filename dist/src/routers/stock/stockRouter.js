"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const AddNewStockValidator_1 = __importDefault(require("../../requestValidators/stock/yarnStock/AddNewStockValidator"));
const yarnCategoryRouter_1 = __importDefault(require("./yarnCategoryRouter"));
const yarnColorCategoryRouter_1 = __importDefault(require("./yarnColorCategoryRouter"));
const GetYarnStockValidator_1 = __importDefault(require("../../requestValidators/stock/yarnStock/GetYarnStockValidator"));
const UpdateStockQuantityValidator_1 = __importDefault(require("../../requestValidators/stock/yarnStock/UpdateStockQuantityValidator"));
const AddYarnStockMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnStock/AddYarnStockMiddleware"));
const DeleteYarnStockValidator_1 = __importDefault(require("../../requestValidators/stock/yarnStock/DeleteYarnStockValidator"));
const DeleteYarnStockMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnStock/DeleteYarnStockMiddleware"));
const UpdateStockValidator_1 = __importDefault(require("../../requestValidators/stock/yarnStock/UpdateStockValidator"));
const UpdateYarnStockMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnStock/UpdateYarnStockMiddleware"));
const YarnStockServices_1 = __importDefault(require("../../services/stock/YarnStockServices"));
const Roles_1 = require("../../entities/Roles");
const JwtAuthMiddleware_1 = __importDefault(require("../../middlewares/JwtAuthMiddleware"));
const stockRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const yarnStockService = new YarnStockServices_1.default();
stockRouter.use('/yarn-categories', yarnCategoryRouter_1.default);
stockRouter.use('/yarn-color-categories', yarnColorCategoryRouter_1.default);
stockRouter.post('/add-new', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...AddNewStockValidator_1.default,
    AddYarnStockMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.insertNewYarnStock(payload);
    return res.json(response);
});
stockRouter.post('/yarn-stocks', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [
        Roles_1.AssignableRoles.ADMIN,
        Roles_1.AssignableRoles.ADMIN_VIEW,
    ]),
    ...GetYarnStockValidator_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.getAllYarnStock(payload);
    return res.json({ data: response });
});
stockRouter.post('/update-quantity', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...UpdateStockQuantityValidator_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.updateYarnStockAmount(payload);
    if (!response.success) {
        return res.status(422).json({ message: response.msg });
    }
    return res.json(response);
});
stockRouter.post('/delete', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...DeleteYarnStockValidator_1.default,
    DeleteYarnStockMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.deleteYarnStock(payload);
    return res.json(response);
});
stockRouter.post('/update', ...[
    upload.none(),
    (0, JwtAuthMiddleware_1.default)(true, [Roles_1.AssignableRoles.ADMIN]),
    ...UpdateStockValidator_1.default,
    UpdateYarnStockMiddleware_1.default,
], async (req, res) => {
    const payload = req.body;
    const response = await yarnStockService.updateYarnStock(payload);
    return res.json(response);
});
exports.default = stockRouter;
//# sourceMappingURL=stockRouter.js.map