import YarnCategoryRepository from '../../repositories/YarnCategoryRepository';
import {
  AddNewYarnCategoryPayload,
  DeleteYarnCategoryPayload,
  UpdateYarnCategoryPayload,
} from './typings';

class YarnCategoryServices {
  private yarnCategoryRepository = new YarnCategoryRepository();

  getAllYarnCategories = async () => {
    const response = await this.yarnCategoryRepository.getAll();
    return response;
  };

  addNewYarnCategory = async (payload: AddNewYarnCategoryPayload) => {
    const response = await this.yarnCategoryRepository.addNew(payload);
    return response;
  };

  updateYarnCategory = async (payload: UpdateYarnCategoryPayload) => {
    const response = await this.yarnCategoryRepository.update(payload);
    return response;
  };

  deleteYarnCategory = async (payload: DeleteYarnCategoryPayload) => {
    const response = await this.yarnCategoryRepository.delete(payload.id);
    return response;
  };
}

export default YarnCategoryServices;
