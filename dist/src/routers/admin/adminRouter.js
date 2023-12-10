"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminUserRouter_1 = __importDefault(require("./user/adminUserRouter"));
const adminRouter = (0, express_1.Router)();
adminRouter.use('/user', adminUserRouter_1.default);
exports.default = adminRouter;
//# sourceMappingURL=adminRouter.js.map