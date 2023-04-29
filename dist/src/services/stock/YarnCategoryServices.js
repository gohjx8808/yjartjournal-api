"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../../dataSource");
const YarnCategoryRepository_1 = __importDefault(require("../../repositories/YarnCategoryRepository"));
class YarnCategoryServices {
    yarnCategoryRepository = new YarnCategoryRepository_1.default();
    getAllYarnCategories = async () => {
        await dataSource_1.dataSource.initialize();
        const response = await this.yarnCategoryRepository.getAll();
        return response;
    };
    addNewYarnCategory = async (payload) => {
        const response = await this.yarnCategoryRepository.addNew(payload);
        return response;
    };
    updateYarnCategory = async (payload) => {
        const response = await this.yarnCategoryRepository.update(payload);
        return response;
    };
    deleteYarnCategory = async (payload) => {
        const response = await this.yarnCategoryRepository.delete(payload.id);
        return response;
    };
}
exports.default = YarnCategoryServices;
//# sourceMappingURL=YarnCategoryServices.js.map