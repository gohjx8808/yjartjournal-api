import YarnColorCategoryRepository from '../../repositories/YarnColorCategoryRepository';

class YarnColorCategoryServices {
  private yarnColorCategoryRepository = new YarnColorCategoryRepository();

  getAllYarnColorCategories = async () => {
    const response = await this.yarnColorCategoryRepository.getAll();
    return response;
  };
}

export default YarnColorCategoryServices;
