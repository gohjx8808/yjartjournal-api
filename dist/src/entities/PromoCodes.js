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
const typeorm_1 = require("typeorm");
const Orders_1 = __importDefault(require("./Orders"));
const PromoTypes_1 = __importDefault(require("./PromoTypes"));
let PromoCodes = class PromoCodes {
    id;
    name;
    promoType;
    promoValue;
    useLimit;
    startedAt;
    expiredAt;
    createdAt;
    updatedAt;
    orders;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PromoCodes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PromoCodes.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PromoTypes_1.default, (promoType) => promoType.promoCodes),
    (0, typeorm_1.JoinColumn)({ name: 'promo_type_id', referencedColumnName: 'id' }),
    __metadata("design:type", PromoTypes_1.default)
], PromoCodes.prototype, "promoType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'promo_value' }),
    __metadata("design:type", Number)
], PromoCodes.prototype, "promoValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'use_limit', nullable: true }),
    __metadata("design:type", Number)
], PromoCodes.prototype, "useLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at' }),
    __metadata("design:type", Date)
], PromoCodes.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expired_at' }),
    __metadata("design:type", Date)
], PromoCodes.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PromoCodes.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PromoCodes.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Orders_1.default, (order) => order.promoCodeUsed),
    __metadata("design:type", Array)
], PromoCodes.prototype, "orders", void 0);
PromoCodes = __decorate([
    (0, typeorm_1.Entity)()
], PromoCodes);
exports.default = PromoCodes;
//# sourceMappingURL=PromoCodes.js.map