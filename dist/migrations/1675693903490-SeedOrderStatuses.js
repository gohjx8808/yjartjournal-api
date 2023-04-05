"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedOrderStatuses1675693903490 = void 0;
const dataSource_1 = require("../src/dataSource");
const OrderStatuses_1 = __importDefault(require("../src/entities/OrderStatuses"));
class SeedOrderStatuses1675693903490 {
    constructor() {
        this.orderStatusesSeed = [
            { name: 'Pending Payment' },
            { name: 'Crocheting' },
            { name: 'Shipped' },
            { name: 'Delivered' },
        ];
    }
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            yield dataSource_1.manager.getRepository(OrderStatuses_1.default).save(this.orderStatusesSeed);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    down() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.SeedOrderStatuses1675693903490 = SeedOrderStatuses1675693903490;
//# sourceMappingURL=1675693903490-SeedOrderStatuses.js.map