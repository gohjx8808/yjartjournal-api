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
exports.productRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const productValidators_1 = require("../requestValidators/productValidators");
const productServices_1 = require("../services/product/productServices");
const upload = (0, multer_1.default)();
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/categories', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, productServices_1.getProductCategories)();
    res.json({ data: categories });
}));
exports.productRouter.post('/', ...[upload.none(), ...productValidators_1.allProductsValidator], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    res.json({ data: yield (0, productServices_1.getAllProducts)(payload) });
}));
exports.productRouter.get('/sort-options', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortOptions = yield (0, productServices_1.getSortOptions)();
    res.json({ data: sortOptions });
}));
exports.productRouter.get('/image-gallery', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productImages = yield (0, productServices_1.getAllImages)();
    res.json({ data: productImages });
}));
//# sourceMappingURL=productRouter.js.map