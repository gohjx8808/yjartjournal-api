"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = require("typeorm");
const Orders_1 = __importDefault(require("./Orders"));
let CheckoutItems = class CheckoutItems {
    id;
    order;
    productId;
    name;
    pricePerItem;
    quantity;
    totalPrice;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CheckoutItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Orders_1.default, (order) => order.checkoutItems),
    (0, typeorm_1.JoinColumn)({ name: "order_id", referencedColumnName: "id" }),
    __metadata("design:type", Orders_1.default)
], CheckoutItems.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product_id" }),
    __metadata("design:type", String)
], CheckoutItems.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CheckoutItems.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { name: "price_per_item", scale: 2 }),
    __metadata("design:type", Number)
], CheckoutItems.prototype, "pricePerItem", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CheckoutItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { name: "total_price", scale: 2 }),
    __metadata("design:type", Number)
], CheckoutItems.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], CheckoutItems.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], CheckoutItems.prototype, "updatedAt", void 0);
CheckoutItems = __decorate([
    (0, typeorm_1.Entity)()
], CheckoutItems);
exports.default = CheckoutItems;
//# sourceMappingURL=CheckoutItems.js.map