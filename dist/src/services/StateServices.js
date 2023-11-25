"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StateRepository_1 = __importDefault(require("../repositories/StateRepository"));
class default_1 {
    stateRepository = new StateRepository_1.default();
    getAll = () => this.stateRepository.getStateList();
}
exports.default = default_1;
//# sourceMappingURL=StateServices.js.map