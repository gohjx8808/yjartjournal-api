"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnColorCategoryRepository_1 = __importDefault(require("../../../repositories/YarnColorCategoryRepository"));
const YarnStockRepository_1 = __importDefault(require("../../../repositories/YarnStockRepository"));
const DeleteYarnColorCategoryMiddleware = async (req, res, next) => {
    const payload = req.body;
    const yarnColorCategoryRepository = new YarnColorCategoryRepository_1.default();
    const yarnStockRepository = new YarnStockRepository_1.default();
    const existingById = await yarnColorCategoryRepository.getById(payload.id);
    if (!existingById) {
        return res.status(404).json({ message: 'Invalid yarn color category id.' });
    }
    const existingYarnStock = await yarnStockRepository.getByYarnColorCategoryId(payload.id);
    if (existingYarnStock) {
        return res.status(422).json({
            message: 'There is existing stock associates. Please remove it and try again.',
        });
    }
    return next();
};
exports.default = DeleteYarnColorCategoryMiddleware;
//# sourceMappingURL=DeleteYarnColorCategoryMiddleware.js.map