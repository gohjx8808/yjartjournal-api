"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnColorCategoryRepository_1 = __importDefault(require("../../../repositories/YarnColorCategoryRepository"));
const UpdateYarnColorCategoryMiddleware = async (req, res, next) => {
    const payload = req.body;
    const yarnColorCategoryRepository = new YarnColorCategoryRepository_1.default();
    const existingById = await yarnColorCategoryRepository.getById(payload.id);
    if (!existingById) {
        return res.status(404).json({ message: 'Invalid yarn color category id.' });
    }
    const existingByName = await yarnColorCategoryRepository.getByNameExceptSelf(payload);
    if (existingByName) {
        return res
            .status(422)
            .json({ message: 'Duplicated yarn color category detected.' });
    }
    return next();
};
exports.default = UpdateYarnColorCategoryMiddleware;
//# sourceMappingURL=UpdateYarnColorCategoryMiddleware.js.map