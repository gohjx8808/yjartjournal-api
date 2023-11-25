"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StateRepositorya_1 = __importDefault(require("../repositories/StateRepositorya"));
class default_1 {
    stateRepository = new StateRepositorya_1.default();
    getAll = () => this.stateRepository.getStateList();
}
exports.default = default_1;
//# sourceMappingURL=StateServices.js.map