import YarnCategoryRepository from '../../repositories/YarnCategoryRepository';
import YarnColorCategoryRepository from '../../repositories/YarnColorCategoryRepository';
import YarnStockRepository from '../../repositories/YarnStockRepository';
import { AddNewYarnStockPayload, GetYarnStockPayload } from './typings';

class YarnStockService {
  private yarnStockRepository = new YarnStockRepository();

  private yarnCategoryRepository = new YarnCategoryRepository();

  private yarnColorCategoryRepository = new YarnColorCategoryRepository();

  insertNewYarnStock = async (payload: AddNewYarnStockPayload) => {
    const res = await this.yarnStockRepository.insertNewYarnStock(payload);
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
      filtered = yarnStocks.filter((stock) =>
        payload.yarnColorCategoryIds.includes(stock.yarnColorCategory.id),
      );
    }

    return filtered;
  };

  getAllYarnCategories = async () => {
    const response = await this.yarnCategoryRepository.getAll();
    return response;
  };

  getAllYarnColorCategories = async () => {
    const response = await this.yarnColorCategoryRepository.getAll();
    return response;
  };
}

export default YarnStockService;
