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
const DeleteYarnColorCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnColorCategory/DeleteYarnColorCategoryMiddleware"));
const UpdateYarnColorCategoryMiddleware_1 = __importDefault(require("../../middlewares/stocks/yarnColorCategory/UpdateYarnColorCategoryMiddleware"));
const AddNewYarnColorCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnColorCategory/AddNewYarnColorCategoryValidator"));
const DeleteYarnColorCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnColorCategory/DeleteYarnColorCategoryValidator"));
const UpdateYarnColorCategoryValidator_1 = __importDefault(require("../../requestValidators/stock/yarnColorCategory/UpdateYarnColorCategoryValidator"));
const YarnColorCategoryServices_1 = __importDefault(require("../../services/stock/YarnColorCategoryServices"));
const yarnColorCategoryRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const yarnColorCategoryServices = new YarnColorCategoryServices_1.default();
yarnColorCategoryRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield yarnColorCategoryServices.getAllYarnColorCategories();
    return res.json({ data: response });
}));
yarnColorCategoryRouter.post('/add-new', ...[upload.none(), ...AddNewYarnColorCategoryValidator_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield yarnColorCategoryServices.addNewYarnCategory(payload);
    return res.json({ data: response });
}));
yarnColorCategoryRouter.post('/update', ...[
    upload.none(),
    ...UpdateYarnColorCategoryValidator_1.default,
    UpdateYarnColorCategoryMiddleware_1.default,
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield yarnColorCategoryServices.updateYarnCategory(payload);
    return res.json({ data: response });
}));
yarnColorCategoryRouter.post('/delete', ...[
    upload.none(),
    ...DeleteYarnColorCategoryValidator_1.default,
    DeleteYarnColorCategoryMiddleware_1.default,
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield yarnColorCategoryServices.deleteYarnCategory(payload);
    return res.json({ data: response });
}));
exports.default = yarnColorCategoryRouter;
//# sourceMappingURL=yarnColorCategoryRouter.js.map