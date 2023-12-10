"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const yarnCategoryRouter_1 = __importDefault(require("./yarnCategoryRouter"));
const yarnColorCategoryRouter_1 = __importDefault(require("./yarnColorCategoryRouter"));
const promoCodeRouter_1 = __importDefault(require("./promoCodeRouter"));
const masterDataRouter = (0, express_1.Router)();
masterDataRouter.use('/yarn-categories', yarnCategoryRouter_1.default);
masterDataRouter.use('/yarn-color-categories', yarnColorCategoryRouter_1.default);
masterDataRouter.use('/promo-codes', promoCodeRouter_1.default);
exports.default = masterDataRouter;
//# sourceMappingURL=masterDataRouter.js.map