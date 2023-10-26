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
        yarnCategory: { id: payload.yarnCategoryId },
        yarnColorCategory: { id: payload.yarnColorCategoryId },
        costPerItem: payload.cost,
        inStockQuantity: payload.quantity,
        lastOrderedAt: payload.lastOrderedDate,
        imageUrl: uploadedImg?.secure_url,
        imageId: uploadedImg?.public_id,
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
    getByCategoryIdColorCategoryIdName = (yarnCategoryId, yarnColorCategoryId, name, selfId = null) => yarnStockManager.findOne({
        where: {
            yarnCategory: { id: yarnCategoryId },
            yarnColorCategory: { id: yarnColorCategoryId },
            name,
            ...(selfId && { id: (0, typeorm_1.Not)(selfId) }),
        },
    });
    getByYarnCategoryId = (yarnCategoryId) => yarnStockManager.findOneBy({ yarnCategory: { id: yarnCategoryId } });
    getByYarnColorCategoryId = (yarnColorCategoryId) => yarnStockManager.findOneBy({
        yarnColorCategory: { id: yarnColorCategoryId },
    });
    deleteYarnStock = (yarnId) => yarnStockManager.delete({ id: yarnId });
    updateYarnStock = (payload, updatedImg) => yarnStockManager.update({ id: payload.yarnId }, {
        yarnCategory: { id: payload.yarnCategoryId },
        yarnColorCategory: { id: payload.yarnColorCategoryId },
        name: payload.name,
        costPerItem: payload.cost,
        reorderLevel: payload.reorderLevel,
        lastOrderedAt: payload.lastOrderedDate,
        imageId: updatedImg.id,
        imageUrl: updatedImg.url,
    });
}
exports.default = YarnStockRepository;
//# sourceMappingURL=YarnStockRepository.js.map