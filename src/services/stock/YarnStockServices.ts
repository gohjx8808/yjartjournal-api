import YarnCategoryRepository from '../../repositories/YarnCategoryRepository';
import YarnColorCategoryRepository from '../../repositories/YarnColorCategoryRepository';
import YarnStockRepository from '../../repositories/YarnStockRepository';
import { AddNewYarnStockPayload } from './typings';

class YarnStockService {
  private yarnStockRepository = new YarnStockRepository();

  private yarnCategoryRepository = new YarnCategoryRepository();

  private yarnColorCategoryRepository = new YarnColorCategoryRepository();

  insertNewYarnStock = async (payload: AddNewYarnStockPayload) => {
    const res = await this.yarnStockRepository.insertNewYarnStock(payload);
    return res;
  };

  getAllYarnStock = async () => {
    const res = await this.yarnStockRepository.getAll();
    return res;
  };

  getAllYarnCategories = async ()=>{
    const response = await this.yarnCategoryRepository.getAll();
    return response;
  };

  getAllYarnColorCategories = async ()=>{
    const response = await this.yarnColorCategoryRepository.getAll();
    return response;
  };
}

export default YarnStockService;
