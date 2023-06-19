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
exports.AssignableRoles = void 0;
const typeorm_1 = require("typeorm");
const UserRoles_1 = __importDefault(require("./UserRoles"));
var AssignableRoles;
(function (AssignableRoles) {
    AssignableRoles[AssignableRoles["ADMIN_VIEW"] = 1] = "ADMIN_VIEW";
    AssignableRoles[AssignableRoles["ADMIN"] = 2] = "ADMIN";
    AssignableRoles[AssignableRoles["CUSTOMER"] = 3] = "CUSTOMER";
})(AssignableRoles || (exports.AssignableRoles = AssignableRoles = {}));
let Roles = class Roles {
    id;
    name;
    createdAt;
    updatedAt;
    userRoles;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Roles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Roles.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Roles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Roles.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRoles_1.default, (userRole) => userRole.role),
    __metadata("design:type", Array)
], Roles.prototype, "userRoles", void 0);
Roles = __decorate([
    (0, typeorm_1.Entity)()
], Roles);
exports.default = Roles;
//# sourceMappingURL=Roles.js.map