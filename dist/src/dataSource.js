"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const _1672062650913_SeedSortOptions_1 = require("../migrations/1672062650913-SeedSortOptions");
const SortOptions_1 = __importDefault(require("./entities/SortOptions"));
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRESQL_DB_HOST,
    port: parseInt(process.env.POSTGRESQL_DB_PORT || '0', 10),
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB_DATABASE,
    entities: [
        SortOptions_1.default,
    ],
    migrations: [
        _1672062650913_SeedSortOptions_1.SeedSortOptions1672062650913,
    ],
    synchronize: true,
    logging: false,
});
//# sourceMappingURL=dataSource.js.map