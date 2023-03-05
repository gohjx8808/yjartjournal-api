"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateRepository = exports.checkoutItemRepository = exports.orderRepository = exports.promoCodeRepository = exports.addressRepository = exports.manager = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const _1672062650913_SeedSortOptions_1 = require("../migrations/1672062650913-SeedSortOptions");
const _1675693903490_SeedOrderStatuses_1 = require("../migrations/1675693903490-SeedOrderStatuses");
const _1677079230858_SeedStates_1 = require("../migrations/1677079230858-SeedStates");
const Addresses_1 = __importDefault(require("./entities/Addresses"));
const CheckoutItems_1 = __importDefault(require("./entities/CheckoutItems"));
const Feedbacks_1 = __importDefault(require("./entities/Feedbacks"));
const Orders_1 = __importDefault(require("./entities/Orders"));
const OrderStatuses_1 = __importDefault(require("./entities/OrderStatuses"));
const PromoCodes_1 = __importDefault(require("./entities/PromoCodes"));
const SortOptions_1 = __importDefault(require("./entities/SortOptions"));
const States_1 = __importDefault(require("./entities/States"));
const Users_1 = require("./entities/Users");
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRESQL_DB_HOST,
    port: parseInt(process.env.POSTGRESQL_DB_PORT || '0', 10),
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB_DATABASE,
    entities: [
        SortOptions_1.default,
        Feedbacks_1.default,
        Users_1.Users,
        States_1.default,
        Addresses_1.default,
        PromoCodes_1.default,
        OrderStatuses_1.default,
        Orders_1.default,
        CheckoutItems_1.default,
    ],
    migrations: [
        _1672062650913_SeedSortOptions_1.SeedSortOptions1672062650913,
        _1675693903490_SeedOrderStatuses_1.SeedOrderStatuses1675693903490,
        _1677079230858_SeedStates_1.SeedStates1677079230858,
    ],
    synchronize: true,
    logging: false,
});
exports.manager = exports.dataSource.manager;
exports.addressRepository = exports.manager.getRepository(Addresses_1.default);
exports.promoCodeRepository = exports.manager.getRepository(PromoCodes_1.default);
exports.orderRepository = exports.manager.getRepository(Orders_1.default);
exports.checkoutItemRepository = exports.manager.getRepository(CheckoutItems_1.default);
exports.stateRepository = exports.manager.getRepository(States_1.default);
//# sourceMappingURL=dataSource.js.map