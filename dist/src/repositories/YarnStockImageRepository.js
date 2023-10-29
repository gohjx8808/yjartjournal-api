"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const YarnStockImages_1 = __importDefault(require("../entities/YarnStockImages"));
const yarnStockImageManager = dataSource_1.manager.getRepository(YarnStockImages_1.default);
class YarnStockImageRepository {
    insertNewImage = async (uploadedImage, imageName, yarnStockId) => yarnStockImageManager.insert({
        cloudinaryId: uploadedImage.public_id,
        imageUrl: uploadedImage.secure_url,
        originalName: imageName,
        yarnStock: { id: yarnStockId },
    });
    delete = async (yarnImageId) => yarnStockImageManager.delete({ id: yarnImageId });
    getByYarnStockId = async (yarnStockId) => yarnStockImageManager.findBy({ yarnStock: { id: yarnStockId } });
    update = async (uploadedImage, imageName, yarnImageId, yarnStockId) => yarnStockImageManager.update({ id: yarnImageId }, {
        cloudinaryId: uploadedImage.public_id,
        imageUrl: uploadedImage.secure_url,
        originalName: imageName,
        yarnStock: { id: yarnStockId },
    });
}
exports.default = YarnStockImageRepository;
//# sourceMappingURL=YarnStockImageRepository.js.map