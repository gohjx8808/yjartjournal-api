"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewOrder = exports.getOrderByAddressPromoCodeUsed = void 0;
const dataSource_1 = require("../dataSource");
const Orders_1 = __importDefault(require("../entities/Orders"));
const orderManager = dataSource_1.manager.getRepository(Orders_1.default);
const getOrderByAddressPromoCodeUsed = (address, promoCode) => orderManager.findBy({
    address: address,
    promoCodeUsed: promoCode,
});
exports.getOrderByAddressPromoCodeUsed = getOrderByAddressPromoCodeUsed;
const insertNewOrder = (payload, addressId) => orderManager.insert({
    ...payload,
    address: { id: addressId },
    orderStatus: { id: 1 },
});
exports.insertNewOrder = insertNewOrder;
//# sourceMappingURL=orderRepository.js.map