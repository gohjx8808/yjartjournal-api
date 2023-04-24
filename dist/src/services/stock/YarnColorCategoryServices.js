"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnColorCategoryRepository_1 = __importDefault(require("../../repositories/YarnColorCategoryRepository"));
class YarnColorCategoryServices {
    yarnColorCategoryRepository = new YarnColorCategoryRepository_1.default();
    getAllYarnColorCategories = async () => {
        const response = await this.yarnColorCategoryRepository.getAll();
        return response;
    };
    addNewYarnCategory = async (payload) => {
        const response = await this.yarnColorCategoryRepository.addNew(payload);
        return response;
    };
    updateYarnCategory = async (payload) => {
        const response = await this.yarnColorCategoryRepository.update(payload);
        return response;
    };
    deleteYarnCategory = async (payload) => {
        const response = await this.yarnColorCategoryRepository.delete(payload.id);
        return response;
    };
}
exports.default = YarnColorCategoryServices;
//# sourceMappingURL=YarnColorCategoryServices.js.map