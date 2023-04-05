import YarnColorCategoryRepository from '../../repositories/YarnColorCategoryRepository';
import { AddNewYarnColorCategoryPayload, DeleteYarnColorCategoryPayload, UpdateYarnColorCategoryPayload } from './typings';

class YarnColorCategoryServices {
  private yarnColorCategoryRepository = new YarnColorCategoryRepository();

  getAllYarnColorCategories = async () => {
    const response = await this.yarnColorCategoryRepository.getAll();
    return response;
  };

  addNewYarnCategory = async (payload: AddNewYarnColorCategoryPayload) => {
    const response = await this.yarnColorCategoryRepository.addNew(payload);
    return response;
  };

  updateYarnCategory = async (payload: UpdateYarnColorCategoryPayload) => {
    const response = await this.yarnColorCategoryRepository.update(payload);
    return response;
  };

  deleteYarnCategory = async (payload: DeleteYarnColorCategoryPayload) => {
    const response = await this.yarnColorCategoryRepository.delete(payload.id);
    return response;
  };
}

export default YarnColorCategoryServices;
