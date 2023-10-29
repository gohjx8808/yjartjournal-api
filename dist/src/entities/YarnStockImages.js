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
const YarnStocks_1 = __importDefault(require("./YarnStocks"));
let YarnStockImages = class YarnStockImages {
    id;
    yarnStock;
    cloudinaryId;
    originalName;
    imageUrl;
    createdAt;
    updatedAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], YarnStockImages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => YarnStocks_1.default, (yarnStock) => yarnStock.yarnStockImages),
    (0, typeorm_1.JoinColumn)({ name: 'yarn_stock_id', referencedColumnName: 'id' }),
    __metadata("design:type", YarnStocks_1.default)
], YarnStockImages.prototype, "yarnStock", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cloudinary_id' }),
    __metadata("design:type", String)
], YarnStockImages.prototype, "cloudinaryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_name' }),
    __metadata("design:type", String)
], YarnStockImages.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url' }),
    __metadata("design:type", String)
], YarnStockImages.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', select: false }),
    __metadata("design:type", Date)
], YarnStockImages.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', select: false }),
    __metadata("design:type", Date)
], YarnStockImages.prototype, "updatedAt", void 0);
YarnStockImages = __decorate([
    (0, typeorm_1.Entity)()
], YarnStockImages);
exports.default = YarnStockImages;
//# sourceMappingURL=YarnStockImages.js.map