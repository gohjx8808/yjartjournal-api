"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const YarnCategories_1 = __importDefault(require("../entities/YarnCategories"));
const yarnCategoryManager = dataSource_1.manager.getRepository(YarnCategories_1.default);
class YarnCategoryRepository {
    constructor() {
        this.getAll = () => yarnCategoryManager.find();
    }
}
exports.default = YarnCategoryRepository;
//# sourceMappingURL=YarnCategoryRepository.js.map