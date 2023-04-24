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
const YarnStocks_1 = __importDefault(require("./YarnStocks"));
let YarnCategories = class YarnCategories {
    id;
    name;
    createdAt;
    updatedAt;
    yarnStocks;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], YarnCategories.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], YarnCategories.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at", select: false }),
    __metadata("design:type", Date)
], YarnCategories.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at", select: false }),
    __metadata("design:type", Date)
], YarnCategories.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => YarnStocks_1.default, (yarnStocks) => yarnStocks.yarnCategory),
    __metadata("design:type", YarnStocks_1.default)
], YarnCategories.prototype, "yarnStocks", void 0);
YarnCategories = __decorate([
    (0, typeorm_1.Entity)()
], YarnCategories);
exports.default = YarnCategories;
//# sourceMappingURL=YarnCategories.js.map