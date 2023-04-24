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
const ResetPasswordTokens_1 = __importDefault(require("./ResetPasswordTokens"));
let Users = class Users {
    id;
    name;
    preferredName;
    email;
    password;
    iv;
    countryCode;
    phoneNumber;
    gender;
    dob;
    isAdmin;
    createdAt;
    updatedAt;
    addresses;
    resetPasswordTokens;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "preferred_name", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "preferredName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "iv", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "country_code" }),
    __metadata("design:type", String)
], Users.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone_number" }),
    __metadata("design:type", String)
], Users.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char" }),
    __metadata("design:type", String)
], Users.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Users.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_admin", default: false }),
    __metadata("design:type", Boolean)
], Users.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Addresses_1.default, (address) => address.user),
    __metadata("design:type", Addresses_1.default)
], Users.prototype, "addresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ResetPasswordTokens_1.default, (resetPasswordToken) => resetPasswordToken.user),
    __metadata("design:type", Array)
], Users.prototype, "resetPasswordTokens", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
exports.default = Users;
//# sourceMappingURL=Users.js.map