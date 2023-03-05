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
exports.insertNewCheckoutItem = void 0;
const dataSource_1 = require("../dataSource");
const CheckoutItems_1 = __importDefault(require("../entities/CheckoutItems"));
const checkoutItemManager = dataSource_1.manager.getRepository(CheckoutItems_1.default);
const insertNewCheckoutItem = (payload, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield checkoutItemManager.insert(Object.assign(Object.assign({}, payload), { order: { id: orderId } }));
    return result;
});
exports.insertNewCheckoutItem = insertNewCheckoutItem;
//# sourceMappingURL=checkoutItemRepository.js.map