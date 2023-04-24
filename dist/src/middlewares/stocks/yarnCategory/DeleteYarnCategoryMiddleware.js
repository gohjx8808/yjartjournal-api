"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnCategoryRepository_1 = __importDefault(require("../../../repositories/YarnCategoryRepository"));
const YarnStockRepository_1 = __importDefault(require("../../../repositories/YarnStockRepository"));
const DeleteYarnCategoryMiddleware = async (req, res, next) => {
    const payload = req.body;
    const yarnCategoryRepository = new YarnCategoryRepository_1.default();
    const yarnStockRepository = new YarnStockRepository_1.default();
    const existingById = await yarnCategoryRepository.getById(payload.id);
    if (!existingById) {
        return res.status(404).json({ message: 'Invalid yarn category id.' });
    }
    const existingYarnStock = await yarnStockRepository.getByYarnCategoryId(payload.id);
    if (existingYarnStock) {
        return res.status(422).json({
            message: 'There is existing stock associates. Please remove it and try again.',
        });
    }
    return next();
};
exports.default = DeleteYarnCategoryMiddleware;
//# sourceMappingURL=DeleteYarnCategoryMiddleware.js.map