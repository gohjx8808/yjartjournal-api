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
exports.getAllImages = exports.getAllProducts = void 0;
const rich_text_html_renderer_1 = require("@contentful/rich-text-html-renderer");
const contentful_1 = require("contentful");
const productHelper_1 = require("../../helpers/productHelper");
const client = (0, contentful_1.createClient)({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});
const getAllProducts = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const sortOrder = (0, productHelper_1.getContentfulOrderByKeyword)(payload.sortId);
    return client
        .getEntries({
        'fields.name[match]': payload.search,
        content_type: 'products',
        order: sortOrder,
    })
        .then((entries) => entries.items.map((entry) => {
        const data = entry.fields;
        let pickedData = [];
        if (data.productImage) {
            pickedData = data.productImage.map((image) => image.fields);
        }
        return Object.assign(Object.assign({}, data), { id: entry.sys.id, contentDescription: (0, rich_text_html_renderer_1.documentToHtmlString)(data.contentDescription), productImage: pickedData });
    }));
});
exports.getAllProducts = getAllProducts;
const getAllImages = () => __awaiter(void 0, void 0, void 0, function* () {
    const assets = yield client.getAssets();
    return assets.items.map((asset) => asset.fields);
});
exports.getAllImages = getAllImages;
//# sourceMappingURL=productServices.js.map