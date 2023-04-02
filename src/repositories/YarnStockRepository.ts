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
}

export default YarnStockRepository;
