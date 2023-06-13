"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllImages = exports.getAllProducts = exports.getProductCategories = void 0;
const contentful_1 = require("contentful");
const productHelper_1 = require("../../helpers/productHelper");
const productConstants_1 = require("../../constants/productConstants");
const client = (0, contentful_1.createClient)({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});
const getProductCategories = async () => {
    const productCategories = await client.withoutUnresolvableLinks
        .getEntries({
        content_type: 'products',
        select: ['fields.category'],
    })
        .then((entries) => entries.items.map((entry) => {
        const data = entry.fields;
        return data.category;
    }));
    return [...new Set(productCategories)].sort();
};
exports.getProductCategories = getProductCategories;
const getAllProducts = async (payload) => {
    const sortOrder = (0, productHelper_1.getContentfulOrderByKeyword)(payload.sortId);
    const productEntries = await client.withoutUnresolvableLinks.getEntries({
        'fields.name[match]': payload.search,
        content_type: 'products',
        order: [sortOrder],
    });
    if (+payload.sortId === productConstants_1.ProductSort.A_TO_Z) {
        productEntries.items = productEntries.items.sort((a, b) => {
            if (a.fields.name < b.fields.name) {
                return -1;
            }
            if (a.fields.name > b.fields.name) {
                return 1;
            }
            return 0;
        });
    }
    else if (+payload.sortId === productConstants_1.ProductSort.Z_TO_A) {
        productEntries.items = productEntries.items.sort((a, b) => {
            if (a.fields.name < b.fields.name) {
                return 1;
            }
            if (a.fields.name > b.fields.name) {
                return -1;
            }
            return 0;
        });
    }
    return productEntries.items.map((entry) => {
        const data = entry.fields;
        let pickedData = [];
        if (data.productImage) {
            pickedData = data.productImage.map((image) => {
                const imageFile = image.fields.file;
                return { url: imageFile.url, filename: imageFile.fileName };
            });
        }
        delete data.productImage;
        return {
            ...data,
            id: entry.sys.id,
            contentDescription: data.contentDescription,
            productImages: pickedData,
        };
    });
};
exports.getAllProducts = getAllProducts;
const getAllImages = async () => {
    const assets = await client.withoutUnresolvableLinks.getEntries({
        content_type: 'gallery',
    });
    return (0, productHelper_1.randomizeImages)(assets.items);
};
exports.getAllImages = getAllImages;
//# sourceMappingURL=productServices.js.map