import { Not } from "typeorm";
import { manager } from "../dataSource";
import YarnColorCategories from "../entities/YarnColorCategories";
import {
  AddNewYarnColorCategoryPayload,
  UpdateYarnColorCategoryPayload,
} from "../services/stock/typings";

const yarnColorCategoryManager = manager.getRepository(YarnColorCategories);

class YarnColorCategoryRepository {
  getAll = () => yarnColorCategoryManager.find();

  getById = (id: number) => yarnColorCategoryManager.findOneBy({ id });

  getByNameExceptSelf = (payload: UpdateYarnColorCategoryPayload) =>
    yarnColorCategoryManager.findOneBy({
      name: payload.name,
      id: Not(payload.id),
    });

  addNew = (payload: AddNewYarnColorCategoryPayload) =>
    yarnColorCategoryManager.upsert(
      { name: payload.name },
      { conflictPaths: ["name"], skipUpdateIfNoValuesChanged: true }
    );

  update = (payload: UpdateYarnColorCategoryPayload) =>
    yarnColorCategoryManager.update({ id: payload.id }, { name: payload.name });

  delete = (id: number) => yarnColorCategoryManager.delete({ id });
}

export default YarnColorCategoryRepository;
