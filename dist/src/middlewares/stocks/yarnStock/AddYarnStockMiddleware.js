"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnStockRepository_1 = __importDefault(require("../../../repositories/YarnStockRepository"));
const AddYarnStockMiddleware = async (req, res, next) => {
    const payload = req.body;
    const yarnStockRepository = new YarnStockRepository_1.default();
    const sameDataExist = await yarnStockRepository.getByCategoryColorCategoryDetailedColor(payload.yarnCategory, payload.yarnColorCategory, payload.detailedColor);
    if (sameDataExist) {
        return res.status(422).json({ message: 'Duplicated data detected.' });
    }
    return next();
};
exports.default = AddYarnStockMiddleware;
//# sourceMappingURL=AddYarnStockMiddleware.js.map