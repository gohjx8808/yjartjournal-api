"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStateList = void 0;
const dataSource_1 = require("../dataSource");
const States_1 = __importDefault(require("../entities/States"));
const stateManager = dataSource_1.manager.getRepository(States_1.default);
const getStateList = () => stateManager.createQueryBuilder().getMany();
exports.getStateList = getStateList;
//# sourceMappingURL=stateRepository.js.map