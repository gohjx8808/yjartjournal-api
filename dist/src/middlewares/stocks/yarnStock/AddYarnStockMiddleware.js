"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnStockRepository_1 = __importDefault(require("../../../repositories/YarnStockRepository"));
const AddYarnStockMiddleware = async (req, res, next) => {
    const payload = req.body;
    const uploadedFile = req.file;
    const yarnStockRepository = new YarnStockRepository_1.default();
    if (uploadedFile && !uploadedFile.mimetype.startsWith('image/')) {
        return res.status(422).json({ message: 'Please only submit image.' });
    }
    const sameDataExist = await yarnStockRepository.getByCategoryIdColorCategoryIdName(payload.yarnCategoryId, payload.yarnColorCategoryId, payload.name);
    if (sameDataExist) {
        return res.status(422).json({ message: 'Duplicated data detected.' });
    }
    return next();
};
exports.default = AddYarnStockMiddleware;
//# sourceMappingURL=AddYarnStockMiddleware.js.map