"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnStockRepository_1 = __importDefault(require("../../../repositories/YarnStockRepository"));
const DeleteYarnStockMiddleware = async (req, res, next) => {
    const yarnStockRepository = new YarnStockRepository_1.default();
    const payload = req.body;
    const dataExist = await yarnStockRepository.getById(payload.yarnId);
    if (!dataExist) {
        return res.status(404).json({ message: 'Invalid yarn stock id.' });
    }
    return next();
};
exports.default = DeleteYarnStockMiddleware;
//# sourceMappingURL=DeleteYarnStockMiddleware.js.map