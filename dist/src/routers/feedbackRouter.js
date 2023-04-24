"use strict";
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
feedbackRouter.post('/submit', ...[upload.none(), ...FeedbackValidator_1.default], async (req, res) => {
    const payload = req.body;
    const response = await (0, feedbackServices_1.saveFeedback)(payload);
    return res.json({ response });
});
exports.default = feedbackRouter;
//# sourceMappingURL=feedbackRouter.js.map