import { Not } from 'typeorm';
import { manager } from '../dataSource';
import YarnStocks from '../entities/YarnStocks';
import { AddNewYarnStockPayload } from '../services/stock/typings';
import { OptionData } from '../typings';

const yarnStockManager = manager.getRepository(YarnStocks);

class YarnStockRepository {
  insertNewYarnStock = async (payload: AddNewYarnStockPayload) =>
    yarnStockManager.insert({
      ...payload,
      costPerItem: payload.cost,
      inStockQuantity: payload.quantity,
      lastOrderedAt: payload.lastOrderedDate,
    });

  getAll = () =>
    yarnStockManager.find({
      relations: ['yarnColorCategory', 'yarnCategory'],
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

  getByCategoryColorCategoryDetailedColor = (
    yarnCategory: OptionData,
    yarnColorCategory: OptionData,
    detailedColor: string,
    selfId: number = null,
  ) =>
    yarnStockManager.findOne({
      where: {
        yarnCategory: { id: yarnCategory.id },
        yarnColorCategory: { id: yarnColorCategory.id },
        detailedColor,
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
}

export default YarnStockRepository;
