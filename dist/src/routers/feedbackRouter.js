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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const FeedbackValidator_1 = __importDefault(require("../requestValidators/FeedbackValidator"));
const feedbackServices_1 = require("../services/feedback/feedbackServices");
const upload = (0, multer_1.default)();
const feedbackRouter = (0, express_1.Router)();
feedbackRouter.post("/submit", ...[upload.none(), ...FeedbackValidator_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const response = yield (0, feedbackServices_1.saveFeedback)(payload);
    return res.json({ response });
}));
exports.default = feedbackRouter;
//# sourceMappingURL=feedbackRouter.js.map