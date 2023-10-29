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
const YarnCategories_1 = __importDefault(require("./YarnCategories"));
const YarnColorCategories_1 = __importDefault(require("./YarnColorCategories"));
const YarnStockImages_1 = __importDefault(require("./YarnStockImages"));
let YarnStocks = class YarnStocks {
    id;
    yarnCategory;
    yarnColorCategory;
    name;
    costPerItem;
    inStockQuantity;
    usedQuantity;
    reorderLevel;
    lastOrderedAt;
    createdAt;
    updatedAt;
    yarnStockImages;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], YarnStocks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => YarnCategories_1.default, (yarnCategory) => yarnCategory.yarnStocks),
    (0, typeorm_1.JoinColumn)({ name: 'yarn_category_id', referencedColumnName: 'id' }),
    __metadata("design:type", YarnCategories_1.default)
], YarnStocks.prototype, "yarnCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => YarnColorCategories_1.default, (yarnColorCategory) => yarnColorCategory.yarnStocks),
    (0, typeorm_1.JoinColumn)({ name: 'yarn_color_category_id', referencedColumnName: 'id' }),
    __metadata("design:type", YarnColorCategories_1.default)
], YarnStocks.prototype, "yarnColorCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name' }),
    __metadata("design:type", String)
], YarnStocks.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost_per_item', type: 'float' }),
    __metadata("design:type", Number)
], YarnStocks.prototype, "costPerItem", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'in_stock_quantity' }),
    __metadata("design:type", Number)
], YarnStocks.prototype, "inStockQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'used_quantity', default: 0 }),
    __metadata("design:type", Number)
], YarnStocks.prototype, "usedQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reorder_level' }),
    __metadata("design:type", Number)
], YarnStocks.prototype, "reorderLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_ordered_at', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], YarnStocks.prototype, "lastOrderedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', select: false }),
    __metadata("design:type", Date)
], YarnStocks.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', select: false }),
    __metadata("design:type", Date)
], YarnStocks.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => YarnStockImages_1.default, (yarnStockImage) => yarnStockImage.yarnStock),
    __metadata("design:type", Array)
], YarnStocks.prototype, "yarnStockImages", void 0);
YarnStocks = __decorate([
    (0, typeorm_1.Entity)()
], YarnStocks);
exports.default = YarnStocks;
//# sourceMappingURL=YarnStocks.js.map