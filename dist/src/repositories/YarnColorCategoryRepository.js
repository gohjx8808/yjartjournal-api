"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const YarnColorCategories_1 = __importDefault(require("../entities/YarnColorCategories"));
const yarnColorCategoryManager = dataSource_1.manager.getRepository(YarnColorCategories_1.default);
class YarnColorCategoryRepository {
    constructor() {
        this.getAll = () => yarnColorCategoryManager.find();
        this.getById = (id) => yarnColorCategoryManager.findOneBy({ id });
        this.getByNameExceptSelf = (payload) => yarnColorCategoryManager.findOneBy({
            name: payload.name,
            id: (0, typeorm_1.Not)(payload.id),
        });
        this.addNew = (payload) => yarnColorCategoryManager.upsert({ name: payload.name }, { conflictPaths: ['name'], skipUpdateIfNoValuesChanged: true });
        this.update = (payload) => yarnColorCategoryManager.update({ id: payload.id }, { name: payload.name });
        this.delete = (id) => yarnColorCategoryManager.delete({ id });
    }
}
exports.default = YarnColorCategoryRepository;
//# sourceMappingURL=YarnColorCategoryRepository.js.map