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
const Users_1 = require("./Users");
let Addresses = class Addresses {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Addresses.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (user) => user.addresses, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
    __metadata("design:type", Users_1.Users)
], Addresses.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "receiver_name" }),
    __metadata("design:type", String)
], Addresses.prototype, "receiverName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "receiver_country_code" }),
    __metadata("design:type", String)
], Addresses.prototype, "receiverCountryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "receiver_phone_number" }),
    __metadata("design:type", String)
], Addresses.prototype, "receiverPhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_one" }),
    __metadata("design:type", String)
], Addresses.prototype, "addressLineOne", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "address_line_two", nullable: true }),
    __metadata("design:type", String)
], Addresses.prototype, "addressLineTwo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Addresses.prototype, "postcode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Addresses.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Addresses.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Addresses.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_default", default: false }),
    __metadata("design:type", Boolean)
], Addresses.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Addresses.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Addresses.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Addresses.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Orders_1.default, (order) => order.address),
    __metadata("design:type", Array)
], Addresses.prototype, "orders", void 0);
Addresses = __decorate([
    (0, typeorm_1.Entity)()
], Addresses);
exports.default = Addresses;
//# sourceMappingURL=Addresses.js.map