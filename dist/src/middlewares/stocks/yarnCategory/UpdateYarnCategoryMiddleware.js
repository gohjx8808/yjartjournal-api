"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnCategoryRepository_1 = __importDefault(require("../../../repositories/YarnCategoryRepository"));
const UpdateYarnCategoryMiddleware = async (req, res, next) => {
    const payload = req.body;
    const yarnCategoryRepository = new YarnCategoryRepository_1.default();
    const existingById = await yarnCategoryRepository.getById(payload.id);
    if (!existingById) {
        return res.status(404).json({ message: 'Invalid yarn category id.' });
    }
    const existingByName = await yarnCategoryRepository.getByNameExceptSelf(payload);
    if (existingByName) {
        return res
            .status(422)
            .json({ message: 'Duplicated yarn category detected.' });
    }
    return next();
};
exports.default = UpdateYarnCategoryMiddleware;
//# sourceMappingURL=UpdateYarnCategoryMiddleware.js.map