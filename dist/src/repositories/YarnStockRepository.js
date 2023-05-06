"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const YarnStocks_1 = __importDefault(require("../entities/YarnStocks"));
const yarnStockManager = dataSource_1.manager.getRepository(YarnStocks_1.default);
class YarnStockRepository {
    insertNewYarnStock = async (payload, uploadedImg) => yarnStockManager.insert({
        ...payload,
        costPerItem: payload.cost,
        inStockQuantity: payload.quantity,
        lastOrderedAt: payload.lastOrderedDate,
        imageUrl: uploadedImg.secure_url,
        imageId: uploadedImg.public_id,
    });
    getAll = () => yarnStockManager.find({
        relations: ['yarnColorCategory', 'yarnCategory'],
        order: { createdAt: 'DESC' },
    });
    updateQuantity = (yarnId, inStockQuantity, usedQuantity) => yarnStockManager.update({ id: yarnId }, { inStockQuantity, usedQuantity });
    getById = (yarnId) => yarnStockManager.findOne({
        where: { id: yarnId },
        relations: ['yarnColorCategory', 'yarnCategory'],
    });
    getByCategoryColorCategoryDetailedColor = (yarnCategory, yarnColorCategory, detailedColor, selfId = null) => yarnStockManager.findOne({
        where: {
            yarnCategory: { id: yarnCategory.id },
            yarnColorCategory: { id: yarnColorCategory.id },
            detailedColor,
            ...(selfId && { id: (0, typeorm_1.Not)(selfId) }),
        },
    });
    getByYarnCategoryId = (yarnCategoryId) => yarnStockManager.findOneBy({ yarnCategory: { id: yarnCategoryId } });
    getByYarnColorCategoryId = (yarnColorCategoryId) => yarnStockManager.findOneBy({
        yarnColorCategory: { id: yarnColorCategoryId },
    });
    deleteYarnStock = (yarnId) => yarnStockManager.delete({ id: yarnId });
    updateYarnStock = (payload, updatedImg) => yarnStockManager.update({ id: payload.yarnId }, {
        yarnCategory: { id: payload.yarnCategory.id },
        yarnColorCategory: { id: payload.yarnColorCategory.id },
        detailedColor: payload.detailedColor,
        costPerItem: payload.cost,
        reorderLevel: payload.reorderLevel,
        lastOrderedAt: payload.lastOrderedDate,
        imageId: updatedImg.public_id,
        imageUrl: updatedImg.secure_url,
    });
}
exports.default = YarnStockRepository;
//# sourceMappingURL=YarnStockRepository.js.map