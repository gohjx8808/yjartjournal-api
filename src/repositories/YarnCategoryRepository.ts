import { manager } from '../dataSource';
import YarnCategories from '../entities/YarnCategories';

const yarnCategoryManager = manager.getRepository(YarnCategories);

class YarnCategoryRepository {
  getAll = async () => {
    const res = await yarnCategoryManager.find();
    return res;
  };
}

export default YarnCategoryRepository;