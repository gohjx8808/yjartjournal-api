"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const YarnColorCategoryRepository_1 = __importDefault(require("../../repositories/YarnColorCategoryRepository"));
class YarnColorCategoryServices {
    constructor() {
        this.yarnColorCategoryRepository = new YarnColorCategoryRepository_1.default();
        this.getAllYarnColorCategories = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnColorCategoryRepository.getAll();
            return response;
        });
        this.addNewYarnCategory = (payload) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnColorCategoryRepository.addNew(payload);
            return response;
        });
        this.updateYarnCategory = (payload) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnColorCategoryRepository.update(payload);
            return response;
        });
        this.deleteYarnCategory = (payload) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.yarnColorCategoryRepository.delete(payload.id);
            return response;
        });
    }
}
exports.default = YarnColorCategoryServices;
//# sourceMappingURL=YarnColorCategoryServices.js.map