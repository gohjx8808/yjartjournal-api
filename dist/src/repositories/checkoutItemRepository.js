"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewCheckoutItem = void 0;
const dataSource_1 = require("../dataSource");
const CheckoutItems_1 = __importDefault(require("../entities/CheckoutItems"));
const checkoutItemManager = dataSource_1.manager.getRepository(CheckoutItems_1.default);
const insertNewCheckoutItem = (payload, orderId) => checkoutItemManager.insert(Object.assign(Object.assign({}, payload), { order: { id: orderId } }));
exports.insertNewCheckoutItem = insertNewCheckoutItem;
//# sourceMappingURL=checkoutItemRepository.js.map