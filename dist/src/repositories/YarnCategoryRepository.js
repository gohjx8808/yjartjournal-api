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
    constructor() {
        this.getAll = () => yarnCategoryManager.find();
        this.getById = (id) => yarnCategoryManager.findOneBy({ id });
        this.getByNameExceptSelf = (payload) => yarnCategoryManager.findOneBy({ name: payload.name, id: (0, typeorm_1.Not)(payload.id) });
        this.addNew = (payload) => yarnCategoryManager.upsert({ name: payload.name }, { conflictPaths: ['name'], skipUpdateIfNoValuesChanged: true });
        this.update = (paload) => yarnCategoryManager.update({ id: paload.id }, { name: paload.name });
    }
}
exports.default = YarnCategoryRepository;
//# sourceMappingURL=YarnCategoryRepository.js.map