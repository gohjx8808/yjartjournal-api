import YarnStockRepository from '../../repositories/YarnStockRepository';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import {
  AddNewYarnStockPayload,
  DeleteYarnStockPayload,
  GetYarnStockPayload,
  StockData,
  UpdateYarnQuantityPayload,
  UpdateYarnStockPayload,
} from './typings';

class YarnStockServices {
  private yarnStockRepository = new YarnStockRepository();

  insertNewYarnStock = async (payload: AddNewYarnStockPayload) => {
    const stockImg = payload.image;
    let uploadedImg: UploadApiResponse;
    if (stockImg) {
      uploadedImg = await cloudinary.uploader.upload(stockImg, {
        folder: 'yarnStocks',
      });
    }
    const res = await this.yarnStockRepository.insertNewYarnStock(
      payload,
      uploadedImg,
    );
    return res;
  };

  getAllYarnStock = async (payload: GetYarnStockPayload) => {
    const yarnStocks = await this.yarnStockRepository.getAll();

    let filtered = yarnStocks;
    if (payload.yarnCategoryIds.length > 0) {
      filtered = yarnStocks.filter((stock) =>
        payload.yarnCategoryIds.includes(stock.yarnCategory.id),
      );
    }

    if (payload.yarnColorCategoryIds.length > 0) {
      filtered = filtered.filter((stock) =>
        payload.yarnColorCategoryIds.includes(stock.yarnColorCategory.id),
      );
    }

    const formattedStockData: StockData[] = filtered.map((stock) => {
      if (stock.inStockQuantity < stock.reorderLevel) {
        return { ...stock, reorderStatus: 'Reorder' };
      }

      return { ...stock, reorderStatus: 'Optimum' };
    });

    return formattedStockData;
  };

  updateYarnStockAmount = async (payload: UpdateYarnQuantityPayload) => {
    const currentYarnStock = await this.yarnStockRepository.getById(
      payload.yarnId,
    );

    if (!currentYarnStock) {
      return { msg: 'Invalid yarn id.', success: false };
    }

    const currentQuantity = currentYarnStock.inStockQuantity;
    let currentUsedQuantity = currentYarnStock.usedQuantity;

    if (payload.quantity < currentQuantity) {
      currentUsedQuantity += currentQuantity - payload.quantity;
    }

    const response = await this.yarnStockRepository.updateQuantity(
      payload.yarnId,
      payload.quantity,
      currentUsedQuantity,
    );
    return { response, success: true };
  };

  deleteYarnStock = async (payload: DeleteYarnStockPayload) => {
    const stock = await this.yarnStockRepository.getById(payload.yarnId);
    await cloudinary.uploader.destroy(stock.imageId);
    const response = await this.yarnStockRepository.deleteYarnStock(
      payload.yarnId,
    );
    return response;
  };

  updateYarnStock = async (payload: UpdateYarnStockPayload) => {
    const stock = await this.yarnStockRepository.getById(payload.yarnId);
    const stockImg = payload.image;
    let updatedImg: UploadApiResponse;
    if (stockImg) {
      await cloudinary.uploader.destroy(stock.imageId);
      updatedImg = await cloudinary.uploader.upload(stockImg, {
        folder: 'yarnStocks',
        public_id: stock.imageId,
        overwrite: true,
      });
    }
    const response = await this.yarnStockRepository.updateYarnStock(
      payload,
      updatedImg,
    );
    return response;
  };
}

export default YarnStockServices;
