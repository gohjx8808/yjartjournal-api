"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const DeleteYarnCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/DeleteYarnCategoryMiddleware"));
const UpdateYarnCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/UpdateYarnCategoryMiddleware"));
const AddNewYarnCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnCategory/AddNewYarnCategoryValidator"));
const DeleteYarnCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnCategory/DeleteYarnCategoryValidator"));
const UpdateYarnCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnCategory/UpdateYarnCategoryValidator"));
const YarnCategoryServices_1 = __importDefault(require("../../services/stock/YarnCategoryServices"));
const yarnCategoryRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const yarnCategoryService = new YarnCategoryServices_1.default();
yarnCategoryRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield yarnCategoryService.getAllYarnCategories();
    return res.json({ data: response });
}));
yarnCategoryRouter.post('/add-new', ...[upload.none(), ...AddNewYarnCategoryValidator_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield yarnCategoryService.addNewYarnCategory(payload);
    return res.json({ data: response });
}));
yarnCategoryRouter.post('/update', ...[
    upload.none(),
    ...UpdateYarnCategoryValidator_1.default,
    UpdateYarnCategoryMiddleware_1.default,
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield yarnCategoryService.updateYarnCategory(payload);
    return res.json({ data: response });
}));
yarnCategoryRouter.post('/delete', ...[
    upload.none(),
    ...DeleteYarnCategoryValidator_1.default,
    DeleteYarnCategoryMiddleware_1.default,
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield yarnCategoryService.deleteYarnCategory(payload);
    return res.json({ data: response });
}));
exports.default = yarnCategoryRouter;
//# sourceMappingURL=yarnCategoryRouter.js.map