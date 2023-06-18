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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSort = void 0;
const typeorm_1 = require("typeorm");
var ProductSort;
(function (ProductSort) {
    ProductSort[ProductSort["A_TO_Z"] = 1] = "A_TO_Z";
    ProductSort[ProductSort["Z_TO_A"] = 2] = "Z_TO_A";
    ProductSort[ProductSort["LOW_TO_HIGH"] = 3] = "LOW_TO_HIGH";
    ProductSort[ProductSort["HIGH_TO_LOW"] = 4] = "HIGH_TO_LOW";
})(ProductSort || (exports.ProductSort = ProductSort = {}));
let SortOptions = class SortOptions {
    id;
    name;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SortOptions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SortOptions.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SortOptions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], SortOptions.prototype, "updatedAt", void 0);
SortOptions = __decorate([
    (0, typeorm_1.Entity)()
], SortOptions);
exports.default = SortOptions;
//# sourceMappingURL=SortOptions.js.map