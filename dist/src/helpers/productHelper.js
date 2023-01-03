"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContentfulOrderByKeyword = void 0;
const productConstants_1 = require("../constants/productConstants");
const getContentfulOrderByKeyword = (sortById) => {
    switch (+sortById) {
        case productConstants_1.ProductSort.A_TO_Z:
            return 'fields.name';
        case productConstants_1.ProductSort.Z_TO_A:
            return '-fields.name';
        case productConstants_1.ProductSort.LOW_TO_HIGH:
            return 'fields.price';
        case productConstants_1.ProductSort.HIGH_TO_LOW:
            return '-fields.price';
    }
};
exports.getContentfulOrderByKeyword = getContentfulOrderByKeyword;
//# sourceMappingURL=productHelper.js.map