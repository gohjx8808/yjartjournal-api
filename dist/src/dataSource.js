"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manager = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const _1672062650913_SeedSortOptions_1 = require("../migrations/1672062650913-SeedSortOptions");
const _1675693903490_SeedOrderStatuses_1 = require("../migrations/1675693903490-SeedOrderStatuses");
const _1677079230858_SeedStates_1 = require("../migrations/1677079230858-SeedStates");
const _1680409712499_SeedYarnCategories_1 = require("../migrations/1680409712499-SeedYarnCategories");
const _1680410495324_SeedYarnColorCategories_1 = require("../migrations/1680410495324-SeedYarnColorCategories");
const Addresses_1 = __importDefault(require("./entities/Addresses"));
const CheckoutItems_1 = __importDefault(require("./entities/CheckoutItems"));
const Feedbacks_1 = __importDefault(require("./entities/Feedbacks"));
const Orders_1 = __importDefault(require("./entities/Orders"));
const OrderStatuses_1 = __importDefault(require("./entities/OrderStatuses"));
const PromoCodes_1 = __importDefault(require("./entities/PromoCodes"));
const ResetPasswordTokens_1 = __importDefault(require("./entities/ResetPasswordTokens"));
const SortOptions_1 = __importDefault(require("./entities/SortOptions"));
const States_1 = __importDefault(require("./entities/States"));
const Users_1 = __importDefault(require("./entities/Users"));
const YarnCategories_1 = __importDefault(require("./entities/YarnCategories"));
const YarnColorCategories_1 = __importDefault(require("./entities/YarnColorCategories"));
const YarnStocks_1 = __importDefault(require("./entities/YarnStocks"));
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    // url:'postgres://avnadmin:AVNS_pbdKboPQuSMw7SUjGNq@pg-2ea2107d-yjartjournal.aivencloud.com:27376/defaultdb?sslmode=require',
    host: process.env.POSTGRESQL_DB_HOST,
    port: parseInt(process.env.POSTGRESQL_DB_PORT || '0', 10),
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB_DATABASE,
    entities: [
        SortOptions_1.default,
        Feedbacks_1.default,
        Users_1.default,
        States_1.default,
        Addresses_1.default,
        PromoCodes_1.default,
        OrderStatuses_1.default,
        Orders_1.default,
        CheckoutItems_1.default,
        ResetPasswordTokens_1.default,
        YarnStocks_1.default,
        YarnCategories_1.default,
        YarnColorCategories_1.default,
    ],
    migrations: [
        _1672062650913_SeedSortOptions_1.SeedSortOptions1672062650913,
        _1675693903490_SeedOrderStatuses_1.SeedOrderStatuses1675693903490,
        _1677079230858_SeedStates_1.SeedStates1677079230858,
        _1680409712499_SeedYarnCategories_1.SeedYarnCategories1680409712499,
        _1680410495324_SeedYarnColorCategories_1.SeedYarnColorCategories1680410495324,
    ],
    synchronize: true,
    logging: false,
    ssl: process.env.NODE_ENV === 'production' && {
        ca: process.env.AIVEN_DB_CERT,
    },
});
exports.manager = exports.dataSource.manager;
//# sourceMappingURL=dataSource.js.map