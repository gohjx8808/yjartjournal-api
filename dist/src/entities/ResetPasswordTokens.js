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
const Users_1 = __importDefault(require("./Users"));
let ResetPasswordTokens = class ResetPasswordTokens {
    id;
    user;
    token;
    expiredAt;
    isUsed;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResetPasswordTokens.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.default, (user) => user.resetPasswordTokens),
    (0, typeorm_1.JoinColumn)({ name: "user_id", referencedColumnName: "id" }),
    __metadata("design:type", Users_1.default)
], ResetPasswordTokens.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResetPasswordTokens.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "expired_at", type: "date" }),
    __metadata("design:type", Date)
], ResetPasswordTokens.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_used", default: false }),
    __metadata("design:type", Boolean)
], ResetPasswordTokens.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], ResetPasswordTokens.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], ResetPasswordTokens.prototype, "updatedAt", void 0);
ResetPasswordTokens = __decorate([
    (0, typeorm_1.Entity)()
], ResetPasswordTokens);
exports.default = ResetPasswordTokens;
//# sourceMappingURL=ResetPasswordTokens.js.map