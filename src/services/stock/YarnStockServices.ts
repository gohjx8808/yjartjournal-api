import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { formatImageFile } from '../../helpers/sharedHelper';
import YarnStockImageRepository from '../../repositories/YarnStockImageRepository';
import YarnStockRepository from '../../repositories/YarnStockRepository';
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

  private yarnStockImageRepository = new YarnStockImageRepository();

  insertNewYarnStock = async (
    payload: AddNewYarnStockPayload,
    uploadedFile: Express.Multer.File,
  ) => {
    let uploadedImg: UploadApiResponse = null;
    if (uploadedFile) {
      uploadedImg = await cloudinary.uploader.upload(
        formatImageFile(uploadedFile),
        {
          folder: 'yarnStocks',
        },
      );
    }
    const res = await this.yarnStockRepository.insertNewYarnStock(payload);
    if (uploadedImg) {
      await this.yarnStockImageRepository.insertNewImage(
        uploadedImg,
        uploadedFile.originalname,
        res.identifiers[0].id,
      );
    }

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
    for (const image of stock.yarnStockImages) {
      await cloudinary.uploader.destroy(image.cloudinaryId);
      await this.yarnStockImageRepository.delete(image.id);
    }
    const response = await this.yarnStockRepository.deleteYarnStock(
      payload.yarnId,
    );
    return response;
  };

  updateYarnStock = async (
    payload: UpdateYarnStockPayload,
    uploadedFile: Express.Multer.File,
  ) => {
    const images = await this.yarnStockImageRepository.getByYarnStockId(
      payload.yarnId,
    );

    let parseIsUpdated = false;
    if (typeof payload.isImageUpdated === 'string') {
      parseIsUpdated = payload.isImageUpdated === 'true';
    } else if (typeof payload.isImageUpdated === 'boolean') {
      parseIsUpdated = payload.isImageUpdated;
    }

    const existingImageId = images[0] ? images[0].cloudinaryId : null;
    if (uploadedFile) {
      if (parseIsUpdated) {
        const uploadedImg = await cloudinary.uploader.upload(
          formatImageFile(uploadedFile),
          {
            folder: 'yarnStocks',
            public_id: existingImageId?.replace('yarnStocks/', '') ?? null,
            overwrite: true,
          },
        );
        if (images[0]) {
          await this.yarnStockImageRepository.update(
            uploadedImg,
            uploadedFile.originalname,
            images[0].id,
            payload.yarnId,
          );
        } else {
          await this.yarnStockImageRepository.insertNewImage(
            uploadedImg,
            uploadedFile.originalname,
            payload.yarnId,
          );
        }
      }
    } else {
      // delete image
      if (parseIsUpdated) {
        if (existingImageId) {
          await cloudinary.uploader.destroy(existingImageId);
          await this.yarnStockImageRepository.delete(images[0].id);
        }
      }
    }
    const response = await this.yarnStockRepository.updateYarnStock(payload);

    return response;
  };
}

export default YarnStockServices;
