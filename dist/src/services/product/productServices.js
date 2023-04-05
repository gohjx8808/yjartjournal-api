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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllImages = exports.getAllProducts = exports.getProductCategories = void 0;
const contentful_1 = require("contentful");
const productHelper_1 = require("../../helpers/productHelper");
const client = (0, contentful_1.createClient)({
    space: process.env.CONTENTFUL_SPACE_ID || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});
const getProductCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const productCategories = yield client
        .getEntries({
        content_type: "products",
        select: "fields.category",
    })
        .then((entries) => entries.items.map((entry) => {
        const data = entry.fields;
        return data.category;
    }));
    return [...new Set(productCategories)].sort();
});
exports.getProductCategories = getProductCategories;
const getAllProducts = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sortOrder = (0, productHelper_1.getContentfulOrderByKeyword)(payload.sortId);
    return client
        .getEntries({
        "fields.name[match]": payload.search,
        content_type: "products",
        order: sortOrder,
    })
        .then((entries) => entries.items.map((entry) => {
        const data = entry.fields;
        let pickedData = [];
        if (data.productImage) {
            pickedData = data.productImage.map((image) => {
                const imageFile = image.fields.file;
                return { url: imageFile.url, filename: imageFile.fileName };
            });
        }
        delete data.productImage;
        return Object.assign(Object.assign({}, data), { id: entry.sys.id, contentDescription: data.contentDescription, productImages: pickedData });
    }));
});
exports.getAllProducts = getAllProducts;
const getAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield client.getEntries({
        content_type: "gallery",
    });
    return (0, productHelper_1.randomizeImages)(assets.items);
});
exports.getAllImages = getAllImages;
//# sourceMappingURL=productServices.js.map