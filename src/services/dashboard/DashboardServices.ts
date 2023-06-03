import YarnStockRepository from '../../repositories/YarnStockRepository';
import YarnColorCategoryRepository from '../../repositories/YarnColorCategoryRepository';
import YarnCategoryRepository from '../../repositories/YarnCategoryRepository';

class DashboardServices {
  private yarnStockRepository = new YarnStockRepository();

  private yarnColorCategoryRepository = new YarnColorCategoryRepository();

  private yarnCategoryRepository = new YarnCategoryRepository();

  getStockCount = async () => {
    const yarnStocks = await this.yarnStockRepository.getAll();

    const totalYarn = 0;
    const totalReorderYarn = 0;

    return yarnStocks.reduce(
      (accumulator, stock) => {
        accumulator.totalYarn += 1;

        if (stock.inStockQuantity < stock.reorderLevel) {
          accumulator.totalReorderYarn += 1;
        }

        return accumulator;
      },
      {
        totalYarn,
        totalReorderYarn,
      },
    );
  };

  getYarnCategoryCount = async () => {
    const yarnCategories = await this.yarnCategoryRepository.getAll();

    return { categoryCount: yarnCategories.reduce((acc) => acc + 1, 0) };
  };

  getYarnColorCategoryCount = async () => {
    const colorCategories = await this.yarnColorCategoryRepository.getAll();

    return { colorCategoryCount: colorCategories.reduce((acc) => acc + 1, 0) };
  };
}

export default DashboardServices;
