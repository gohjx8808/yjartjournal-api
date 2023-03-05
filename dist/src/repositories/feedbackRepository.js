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
exports.insertNewFeedback = void 0;
const dataSource_1 = require("../dataSource");
const Feedbacks_1 = __importDefault(require("../entities/Feedbacks"));
const feedbackManager = dataSource_1.manager.getRepository(Feedbacks_1.default);
const insertNewFeedback = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const feedbackCreated = yield feedbackManager.insert(payload);
    return feedbackCreated;
});
exports.insertNewFeedback = insertNewFeedback;
//# sourceMappingURL=feedbackRepository.js.map