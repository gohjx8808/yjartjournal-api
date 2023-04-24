"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const YarnCategories_1 = __importDefault(require("../entities/YarnCategories"));
const yarnCategoryManager = dataSource_1.manager.getRepository(YarnCategories_1.default);
class YarnCategoryRepository {
    getAll = () => yarnCategoryManager.find({ order: { id: 'DESC' } });
    getById = (id) => yarnCategoryManager.findOneBy({ id });
    getByNameExceptSelf = (payload) => yarnCategoryManager.findOneBy({ name: payload.name, id: (0, typeorm_1.Not)(payload.id) });
    addNew = (payload) => yarnCategoryManager.upsert({ name: payload.name }, { conflictPaths: ['name'], skipUpdateIfNoValuesChanged: true });
    update = (payload) => yarnCategoryManager.update({ id: payload.id }, { name: payload.name });
    delete = (id) => yarnCategoryManager.delete({ id });
}
exports.default = YarnCategoryRepository;
//# sourceMappingURL=YarnCategoryRepository.js.map