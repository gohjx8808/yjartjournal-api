import YarnStockRepository from '../../repositories/YarnStockRepository';
import {
  AddNewYarnStockPayload,
  GetYarnStockPayload,
  StockData,
  UpdateYarnQuantityPayload,
} from './typings';

class YarnStockServices {
  private yarnStockRepository = new YarnStockRepository();

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

    const formattedStockData: StockData[] = filtered.map((stock) => {
      if (stock.inStockQuantity < stock.reorderLevel) {
        return { ...stock, reorderStatus: 'reorder' };
      }

      return { ...stock, reorderStatus: 'optimum' };
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
}

export default YarnStockServices;
