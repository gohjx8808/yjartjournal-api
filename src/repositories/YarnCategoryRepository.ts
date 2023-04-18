import { Not } from 'typeorm';
import { manager } from '../dataSource';
import YarnCategories from '../entities/YarnCategories';
import {
  AddNewYarnCategoryPayload,
  UpdateYarnCategoryPayload,
} from '../services/stock/typings';

const yarnCategoryManager = manager.getRepository(YarnCategories);

class YarnCategoryRepository {
  getAll = () => yarnCategoryManager.find({ order: { id: 'DESC' } });

  getById = (id: number) => yarnCategoryManager.findOneBy({ id });

  getByNameExceptSelf = (payload: UpdateYarnCategoryPayload) =>
    yarnCategoryManager.findOneBy({ name: payload.name, id: Not(payload.id) });

  addNew = (payload: AddNewYarnCategoryPayload) =>
    yarnCategoryManager.upsert(
      { name: payload.name },
      { conflictPaths: ['name'], skipUpdateIfNoValuesChanged: true },
    );

  update = (payload: UpdateYarnCategoryPayload) =>
    yarnCategoryManager.update({ id: payload.id }, { name: payload.name });

  delete = (id: number) => yarnCategoryManager.delete({ id });
}

export default YarnCategoryRepository;
