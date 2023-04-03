import { manager } from '../dataSource';
import YarnStocks from '../entities/YarnStocks';
import { AddNewYarnStockPayload } from '../services/stock/typings';

const yarnStockManager = manager.getRepository(YarnStocks);

class YarnStockRepository {
  insertNewYarnStock = async (payload: AddNewYarnStockPayload) =>
    yarnStockManager.insert({
      ...payload,
      costPerItem: payload.cost,
      inStockQuantity: payload.quantity,
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
}

export default YarnStockRepository;
