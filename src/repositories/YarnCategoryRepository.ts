import { manager } from '../dataSource';
import YarnCategories from '../entities/YarnCategories';

const yarnCategoryManager = manager.getRepository(YarnCategories);

class YarnCategoryRepository {
  getAll = () => yarnCategoryManager.find();
}

export default YarnCategoryRepository;