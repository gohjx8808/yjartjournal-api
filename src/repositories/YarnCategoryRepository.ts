import { Not } from 'typeorm';
import { manager } from '../dataSource';
import YarnCategories from '../entities/YarnCategories';
import {
  AddNewYarnCategoryPayload,
  UpdateYarnCategoryPayload,
} from '../services/stock/typings';

const yarnCategoryManager = manager.getRepository(YarnCategories);

class YarnCategoryRepository {
  getAll = () => yarnCategoryManager.find();

  getById = (id: number) => yarnCategoryManager.findOneBy({ id });

  getByNameExceptSelf = (payload: UpdateYarnCategoryPayload) =>
    yarnCategoryManager.findOneBy({ name: payload.name, id: Not(payload.id) });

  addNew = (payload: AddNewYarnCategoryPayload) =>
    yarnCategoryManager.upsert(
      { name: payload.name },
      { conflictPaths: ['name'], skipUpdateIfNoValuesChanged: true },
    );

  update = (paload: UpdateYarnCategoryPayload) =>
    yarnCategoryManager.update({ id: paload.id }, { name: paload.name });
}

export default YarnCategoryRepository;
