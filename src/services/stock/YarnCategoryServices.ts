import YarnCategoryRepository from '../../repositories/YarnCategoryRepository';

class YarnCategoryServices {
  private yarnCategoryRepository = new YarnCategoryRepository();

  getAllYarnCategories = async () => {
    const response = await this.yarnCategoryRepository.getAll();
    return response;
  };
}

export default YarnCategoryServices;
