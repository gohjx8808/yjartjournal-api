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
const Addresses_1 = __importDefault(require("./Addresses"));
const OrderStatuses_1 = __importDefault(require("./OrderStatuses"));
let Orders = class Orders {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Orders.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "buyer_email" }),
    __metadata("design:type", String)
], Orders.prototype, "buyerEmail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Addresses_1.default, (address) => address.id),
    (0, typeorm_1.JoinColumn)({ name: "address_id", referencedColumnName: "id" }),
    __metadata("design:type", Addresses_1.default)
], Orders.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "shipping_fee", default: 0 }),
    __metadata("design:type", Number)
], Orders.prototype, "shippingFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_amount" }),
    __metadata("design:type", Number)
], Orders.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "payment_method" }),
    __metadata("design:type", String)
], Orders.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Orders.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => OrderStatuses_1.default, (orderStatus) => orderStatus.id),
    (0, typeorm_1.JoinColumn)({ name: "order_status_id", referencedColumnName: "id" }),
    __metadata("design:type", OrderStatuses_1.default)
], Orders.prototype, "orderStatus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Orders.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Orders.prototype, "updatedAt", void 0);
Orders = __decorate([
    (0, typeorm_1.Entity)()
], Orders);
exports.default = Orders;
//# sourceMappingURL=Orders.js.map