"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnStockRepository_1 = __importDefault(require("../../../repositories/YarnStockRepository"));
const UpdateYarnStockMiddleware = async (req, res, next) => {
    const payload = req.body;
    const yarnStockRepository = new YarnStockRepository_1.default();
    const dataExist = await yarnStockRepository.getById(payload.yarnId);
    if (!dataExist) {
        return res.status(404).json({ message: 'Invalid yarn id.' });
    }
    const sameDataExist = await yarnStockRepository.getByCategoryIdColorCategoryIdName(payload.yarnCategoryId, payload.yarnColorCategoryId, payload.name, payload.yarnId);
    if (sameDataExist) {
        return res.status(422).json({ message: 'Duplicated data detected.' });
    }
    return next();
};
exports.default = UpdateYarnStockMiddleware;
//# sourceMappingURL=UpdateYarnStockMiddleware.js.map