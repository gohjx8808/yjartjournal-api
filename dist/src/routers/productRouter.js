"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const sortOptionsRepository_1 = require("../repositories/sortOptionsRepository");
const GetProductValidator_1 = __importDefault(require("../requestValidators/GetProductValidator"));
const productServices_1 = require("../services/product/productServices");
const upload = (0, multer_1.default)();
const productRouter = (0, express_1.Router)();
productRouter.get('/categories', async (_req, res) => {
    const categories = await (0, productServices_1.getProductCategories)();
    return res.json({ data: categories });
});
productRouter.post('/', ...[upload.none(), ...GetProductValidator_1.default], async (req, res) => {
    const payload = req.body;
    return res.json({ data: await (0, productServices_1.getAllProducts)(payload) });
});
productRouter.get('/sort-options', async (_req, res) => {
    const sortOptions = await (0, sortOptionsRepository_1.getSortOptions)();
    return res.json({ data: sortOptions });
});
productRouter.get('/image-gallery', async (_req, res) => {
    const productImages = await (0, productServices_1.getAllImages)();
    return res.json({ data: productImages });
});
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map