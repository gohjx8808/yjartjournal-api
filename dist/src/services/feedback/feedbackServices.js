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
exports.saveFeedback = void 0;
const dataSource_1 = require("../../dataSource");
const Feedbacks_1 = __importDefault(require("../../entities/Feedbacks"));
const saveFeedback = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackCreated = yield dataSource_1.manager.insert(Feedbacks_1.default, payload);
    return feedbackCreated;
});
exports.saveFeedback = saveFeedback;
//# sourceMappingURL=feedbackServices.js.map