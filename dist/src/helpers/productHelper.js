"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeImages = exports.separateLargeSmallImages = exports.getContentfulOrderByKeyword = void 0;
const productConstants_1 = require("../constants/productConstants");
const getContentfulOrderByKeyword = (sortById) => {
    switch (+sortById) {
        // case ProductSort.A_TO_Z:
        //   return 'fields.name';
        // case ProductSort.Z_TO_A:
        //   return '-fields.name';
        case productConstants_1.ProductSort.LOW_TO_HIGH:
            return 'fields.price';
        case productConstants_1.ProductSort.HIGH_TO_LOW:
            return '-fields.price';
    }
};
exports.getContentfulOrderByKeyword = getContentfulOrderByKeyword;
const separateLargeSmallImages = (assetItems) => {
    let regularProductImages = [];
    let largeProductImages = [];
    assetItems.map((asset) => {
        const assetFields = asset.fields;
        const formattedImages = assetFields.productPhoto1.map((image) => {
            const imageFile = image.fields.file;
            return {
                image: { filename: imageFile.fileName, url: imageFile.url },
                row: assetFields.row,
                column: assetFields.column,
            };
        });
        if (assetFields.row === 1) {
            regularProductImages = formattedImages;
        }
        else {
            largeProductImages = formattedImages;
        }
    });
    return {
        regularProductImages: regularProductImages,
        largeProductImages: largeProductImages,
    };
};
exports.separateLargeSmallImages = separateLargeSmallImages;
const randomizeImages = (assetItems) => {
    const separatedImages = (0, exports.separateLargeSmallImages)(assetItems);
    const productImagesSet = [];
    let largeProductImages = separatedImages.largeProductImages.sort(() => Math.random() - 0.5);
    let regularProductImages = separatedImages.regularProductImages.sort(() => Math.random() - 0.5);
    while (largeProductImages.length > 0 || regularProductImages.length > 0) {
        const tempArr = [
            largeProductImages.pop(),
            ...regularProductImages.splice(0, 6),
        ];
        tempArr.sort(() => Math.random() - 0.5);
        if (tempArr.length > 5) {
            const largeProductIndex = tempArr.findIndex((image) => image.row > 1);
            if (largeProductIndex > 3) {
                const randomIndexToReplace = Math.floor(Math.random() * 4);
                const temp = tempArr[randomIndexToReplace];
                tempArr[randomIndexToReplace] = tempArr[largeProductIndex];
                tempArr[largeProductIndex] = temp;
            }
        }
        productImagesSet.push(...tempArr);
    }
    return productImagesSet;
};
exports.randomizeImages = randomizeImages;
//# sourceMappingURL=productHelper.js.map