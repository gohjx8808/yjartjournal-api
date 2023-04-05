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
const YarnCategoryRepository_1 = __importDefault(require("../../../repositories/YarnCategoryRepository"));
const DeleteYarnCategoryMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const yarnCategoryRepository = new YarnCategoryRepository_1.default();
    const existingById = yield yarnCategoryRepository.getById(payload.id);
    if (!existingById) {
        return res.status(404).json({ message: 'Invalid yarn category id.' });
    }
    return next();
});
exports.default = DeleteYarnCategoryMiddleware;
//# sourceMappingURL=DeleteYarnCategoryMiddleware.js.map