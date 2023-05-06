"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnStockRepository_1 = __importDefault(require("../../repositories/YarnStockRepository"));
const cloudinary_1 = require("cloudinary");
class YarnStockServices {
    yarnStockRepository = new YarnStockRepository_1.default();
    insertNewYarnStock = async (payload) => {
        const stockImg = payload.image;
        let uploadedImg;
        if (stockImg) {
            uploadedImg = await cloudinary_1.v2.uploader.upload(stockImg, {
                folder: 'yarnStocks',
            });
        }
        const res = await this.yarnStockRepository.insertNewYarnStock(payload, uploadedImg);
        return res;
    };
    getAllYarnStock = async (payload) => {
        const yarnStocks = await this.yarnStockRepository.getAll();
        let filtered = yarnStocks;
        if (payload.yarnCategoryIds.length > 0) {
            filtered = yarnStocks.filter((stock) => payload.yarnCategoryIds.includes(stock.yarnCategory.id));
        }
        if (payload.yarnColorCategoryIds.length > 0) {
            filtered = filtered.filter((stock) => payload.yarnColorCategoryIds.includes(stock.yarnColorCategory.id));
        }
        const formattedStockData = filtered.map((stock) => {
            if (stock.inStockQuantity < stock.reorderLevel) {
                return { ...stock, reorderStatus: 'Reorder' };
            }
            return { ...stock, reorderStatus: 'Optimum' };
        });
        return formattedStockData;
    };
    updateYarnStockAmount = async (payload) => {
        const currentYarnStock = await this.yarnStockRepository.getById(payload.yarnId);
        if (!currentYarnStock) {
            return { msg: 'Invalid yarn id.', success: false };
        }
        const currentQuantity = currentYarnStock.inStockQuantity;
        let currentUsedQuantity = currentYarnStock.usedQuantity;
        if (payload.quantity < currentQuantity) {
            currentUsedQuantity += currentQuantity - payload.quantity;
        }
        const response = await this.yarnStockRepository.updateQuantity(payload.yarnId, payload.quantity, currentUsedQuantity);
        return { response, success: true };
    };
    deleteYarnStock = async (payload) => {
        const stock = await this.yarnStockRepository.getById(payload.yarnId);
        await cloudinary_1.v2.uploader.destroy(stock.imageId);
        const response = await this.yarnStockRepository.deleteYarnStock(payload.yarnId);
        return response;
    };
    updateYarnStock = async (payload) => {
        const stock = await this.yarnStockRepository.getById(payload.yarnId);
        const stockImg = payload.image;
        let updatedImg;
        if (stockImg) {
            await cloudinary_1.v2.uploader.destroy(stock.imageId);
            updatedImg = await cloudinary_1.v2.uploader.upload(stockImg, {
                folder: 'yarnStocks',
                public_id: stock.imageId,
                overwrite: true,
            });
        }
        const response = await this.yarnStockRepository.updateYarnStock(payload, updatedImg);
        return response;
    };
}
exports.default = YarnStockServices;
//# sourceMappingURL=YarnStockServices.js.map