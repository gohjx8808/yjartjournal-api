"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewFeedback = void 0;
const dataSource_1 = require("../dataSource");
const Feedbacks_1 = __importDefault(require("../entities/Feedbacks"));
const feedbackManager = dataSource_1.manager.getRepository(Feedbacks_1.default);
const insertNewFeedback = (payload) => feedbackManager.insert(payload);
exports.insertNewFeedback = insertNewFeedback;
//# sourceMappingURL=feedbackRepository.js.map