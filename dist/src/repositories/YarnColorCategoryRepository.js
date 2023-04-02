"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const YarnColorCategories_1 = __importDefault(require("../entities/YarnColorCategories"));
const yarnColorCategoryManager = dataSource_1.manager.getRepository(YarnColorCategories_1.default);
class YarnColorCategoryRepository {
    constructor() {
        this.getAll = () => yarnColorCategoryManager.find();
    }
}
exports.default = YarnColorCategoryRepository;
//# sourceMappingURL=YarnColorCategoryRepository.js.map