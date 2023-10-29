"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const sharedHelper_1 = require("../../helpers/sharedHelper");
const YarnStockImageRepository_1 = __importDefault(require("../../repositories/YarnStockImageRepository"));
const YarnStockRepository_1 = __importDefault(require("../../repositories/YarnStockRepository"));
class YarnStockServices {
    yarnStockRepository = new YarnStockRepository_1.default();
    yarnStockImageRepository = new YarnStockImageRepository_1.default();
    insertNewYarnStock = async (payload, uploadedFile) => {
        let uploadedImg = null;
        if (uploadedFile) {
            uploadedImg = await cloudinary_1.v2.uploader.upload((0, sharedHelper_1.formatImageFile)(uploadedFile), {
                folder: 'yarnStocks',
            });
        }
        const res = await this.yarnStockRepository.insertNewYarnStock(payload);
        if (uploadedImg) {
            await this.yarnStockImageRepository.insertNewImage(uploadedImg, uploadedFile.originalname, res.identifiers[0].id);
        }
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
        for (const image of stock.yarnStockImages) {
            await cloudinary_1.v2.uploader.destroy(image.cloudinaryId);
            await this.yarnStockImageRepository.delete(image.id);
        }
        const response = await this.yarnStockRepository.deleteYarnStock(payload.yarnId);
        return response;
    };
    updateYarnStock = async (payload, uploadedFile) => {
        const images = await this.yarnStockImageRepository.getByYarnStockId(payload.yarnId);
        const existingImageId = images[0] ? images[0].cloudinaryId : null;
        if (uploadedFile) {
            if (payload.isImageUpdated) {
                const uploadedImg = await cloudinary_1.v2.uploader.upload((0, sharedHelper_1.formatImageFile)(uploadedFile), {
                    folder: 'yarnStocks',
                    public_id: existingImageId?.replace('yarnStocks/', '') ?? null,
                    overwrite: true,
                });
                if (images[0]) {
                    await this.yarnStockImageRepository.update(uploadedImg, uploadedFile.originalname, images[0].id, payload.yarnId);
                }
                else {
                    await this.yarnStockImageRepository.insertNewImage(uploadedImg, uploadedFile.originalname, payload.yarnId);
                }
            }
        }
        else {
            // delete image
            if (payload.isImageUpdated) {
                if (existingImageId) {
                    await cloudinary_1.v2.uploader.destroy(existingImageId);
                    await this.yarnStockImageRepository.delete(images[0].id);
                }
            }
        }
        const response = await this.yarnStockRepository.updateYarnStock(payload);
        return response;
    };
}
exports.default = YarnStockServices;
//# sourceMappingURL=YarnStockServices.js.map