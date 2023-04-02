import { manager } from '../dataSource';
import YarnColorCategories from '../entities/YarnColorCategories';

const yarnColorCategoryManager = manager.getRepository(YarnColorCategories);

class YarnColorCategoryRepository {
  getAll = async () => {
    const res = await yarnColorCategoryManager.find();
    return res;
  };
}

export default YarnColorCategoryRepository;