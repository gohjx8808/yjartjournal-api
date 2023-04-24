"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedOrderStatuses1675693903490 = void 0;
const dataSource_1 = require("../src/dataSource");
const OrderStatuses_1 = __importDefault(require("../src/entities/OrderStatuses"));
class SeedOrderStatuses1675693903490 {
    orderStatusesSeed = [
        { name: 'Pending Payment' },
        { name: 'Crocheting' },
        { name: 'Shipped' },
        { name: 'Delivered' },
    ];
    async up() {
        await dataSource_1.manager.getRepository(OrderStatuses_1.default).save(this.orderStatusesSeed);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down() { }
}
exports.SeedOrderStatuses1675693903490 = SeedOrderStatuses1675693903490;
//# sourceMappingURL=1675693903490-SeedOrderStatuses.js.map