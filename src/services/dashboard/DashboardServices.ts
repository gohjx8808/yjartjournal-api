import YarnCategories from '../../entities/YarnCategories';
import YarnColorCategories from '../../entities/YarnColorCategories';
import YarnCategoryRepository from '../../repositories/YarnCategoryRepository';
import YarnColorCategoryRepository from '../../repositories/YarnColorCategoryRepository';
import YarnStockRepository from '../../repositories/YarnStockRepository';
import { ChartData } from './typings';

class DashboardServices {
  private yarnStockRepository = new YarnStockRepository();

  private yarnColorCategoryRepository = new YarnColorCategoryRepository();

  private yarnCategoryRepository = new YarnCategoryRepository();

  getYarnStockOverview = async () => {
    const yarnStocks = await this.yarnStockRepository.getAll();
    const yarnCategories = await this.yarnCategoryRepository.getAll();
    const yarnColorCategories = await this.yarnColorCategoryRepository.getAll();

    const totalYarn = 0;
    const totalReorderYarn = 0;
    const categoryChart: ChartData[] = [];
    const colorCategoryChart: ChartData[] = [];

    const yarnStockOverview = yarnStocks.reduce(
      (accumulator, stock) => {
        accumulator.totalYarn += 1;

        accumulator.categoryChart = this.formatChartData(
          accumulator.categoryChart,
          stock.yarnCategory,
        );
        accumulator.colorCategoryChart = this.formatChartData(
          accumulator.colorCategoryChart,
          stock.yarnColorCategory,
        );

        if (stock.inStockQuantity < stock.reorderLevel) {
          accumulator.totalReorderYarn += 1;
        }

        return accumulator;
      },
      {
        totalYarn,
        totalReorderYarn,
        categoryChart,
        colorCategoryChart,
      },
    );

    return {
      yarnStockOverview,
      categoryCount: yarnCategories.reduce((acc) => acc + 1, 0),
      colorCategoryCount: yarnColorCategories.reduce((acc) => acc + 1, 0),
    };
  };

  private formatChartData(
    chart: ChartData[],
    compareData: YarnCategories | YarnColorCategories,
  ) {
    const targetIndex = chart.findIndex((arr) => arr.id === compareData.id);

    if (targetIndex !== -1) {
      const target = chart[targetIndex];
      chart[targetIndex] = {
        ...target,
        value: target.value + 1,
      };
    } else {
      let formattedName = compareData.name.replaceAll(' ', '\n');
      const sliceIndex = formattedName.indexOf('/');
      formattedName = `${formattedName.substring(
        0,
        sliceIndex + 1,
      )}\n${formattedName.substring(sliceIndex + 1)}`;
      chart.push({
        id: compareData.id,
        value: 1,
        name: formattedName,
      });
    }

    return chart;
  }
}

export default DashboardServices;
