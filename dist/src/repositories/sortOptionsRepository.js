"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortOptions = void 0;
const dataSource_1 = require("../dataSource");
const SortOptions_1 = __importDefault(require("../entities/SortOptions"));
const sortOptionsManager = dataSource_1.manager.getRepository(SortOptions_1.default);
const getSortOptions = () => sortOptionsManager.find();
exports.getSortOptions = getSortOptions;
//# sourceMappingURL=sortOptionsRepository.js.map