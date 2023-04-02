import { manager } from '../dataSource';
import YarnColorCategories from '../entities/YarnColorCategories';

const yarnColorCategoryManager = manager.getRepository(YarnColorCategories);

class YarnColorCategoryRepository {
  getAll = () => yarnColorCategoryManager.find();
}

export default YarnColorCategoryRepository;
