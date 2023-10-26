import { UploadApiResponse } from 'cloudinary';
import { Not } from 'typeorm';
import { manager } from '../dataSource';
import YarnStocks from '../entities/YarnStocks';
import {
  AddNewYarnStockPayload,
  UpdateYarnStockPayload,
  UpdatedImageData,
} from '../services/stock/typings';

const yarnStockManager = manager.getRepository(YarnStocks);

class YarnStockRepository {
  insertNewYarnStock = async (
    payload: AddNewYarnStockPayload,
    uploadedImg: UploadApiResponse | null,
  ) =>
    yarnStockManager.insert({
      ...payload,
      yarnCategory: { id: payload.yarnCategoryId },
      yarnColorCategory: { id: payload.yarnColorCategoryId },
      costPerItem: payload.cost,
      inStockQuantity: payload.quantity,
      lastOrderedAt: payload.lastOrderedDate,
      imageUrl: uploadedImg?.secure_url,
      imageId: uploadedImg?.public_id,
    });

  getAll = () =>
    yarnStockManager.find({
      relations: ['yarnColorCategory', 'yarnCategory'],
      order: { createdAt: 'DESC' },
    });

  updateQuantity = (
    yarnId: number,
    inStockQuantity: number,
    usedQuantity: number,
  ) =>
    yarnStockManager.update({ id: yarnId }, { inStockQuantity, usedQuantity });

  getById = (yarnId: number) =>
    yarnStockManager.findOne({
      where: { id: yarnId },
      relations: ['yarnColorCategory', 'yarnCategory'],
    });

  getByCategoryIdColorCategoryIdName = (
    yarnCategoryId: number,
    yarnColorCategoryId: number,
    name: string,
    selfId: number = null,
  ) =>
    yarnStockManager.findOne({
      where: {
        yarnCategory: { id: yarnCategoryId },
        yarnColorCategory: { id: yarnColorCategoryId },
        name,
        ...(selfId && { id: Not(selfId) }),
      },
    });

  getByYarnCategoryId = (yarnCategoryId: number) =>
    yarnStockManager.findOneBy({ yarnCategory: { id: yarnCategoryId } });

  getByYarnColorCategoryId = (yarnColorCategoryId: number) =>
    yarnStockManager.findOneBy({
      yarnColorCategory: { id: yarnColorCategoryId },
    });

  deleteYarnStock = (yarnId: number) => yarnStockManager.delete({ id: yarnId });

  updateYarnStock = (
    payload: UpdateYarnStockPayload,
    updatedImg: UpdatedImageData,
  ) =>
    yarnStockManager.update(
      { id: payload.yarnId },
      {
        yarnCategory: { id: payload.yarnCategoryId },
        yarnColorCategory: { id: payload.yarnColorCategoryId },
        name: payload.name,
        costPerItem: payload.cost,
        reorderLevel: payload.reorderLevel,
        lastOrderedAt: payload.lastOrderedDate,
        imageId: updatedImg.id,
        imageUrl: updatedImg.url,
      },
    );
}

export default YarnStockRepository;
