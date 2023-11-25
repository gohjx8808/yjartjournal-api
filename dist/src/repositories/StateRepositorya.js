"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const States_1 = __importDefault(require("../entities/States"));
const stateManager = dataSource_1.manager.getRepository(States_1.default);
class default_1 {
    getStateList = () => stateManager.find();
}
exports.default = default_1;
//# sourceMappingURL=StateRepositorya.js.map