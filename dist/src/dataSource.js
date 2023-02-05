"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRepository = exports.userRepository = exports.manager = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const _1672062650913_SeedSortOptions_1 = require("../migrations/1672062650913-SeedSortOptions");
const Addresses_1 = __importDefault(require("./entities/Addresses"));
const Feedbacks_1 = __importDefault(require("./entities/Feedbacks"));
const SortOptions_1 = __importDefault(require("./entities/SortOptions"));
const Users_1 = require("./entities/Users");
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.POSTGRESQL_DB_HOST,
    port: parseInt(process.env.POSTGRESQL_DB_PORT || '0', 10),
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB_DATABASE,
    entities: [SortOptions_1.default, Feedbacks_1.default, Users_1.Users, Addresses_1.default],
    migrations: [_1672062650913_SeedSortOptions_1.SeedSortOptions1672062650913],
    synchronize: true,
    logging: false,
});
exports.manager = exports.dataSource.manager;
exports.userRepository = exports.manager.getRepository(Users_1.Users);
exports.addressRepository = exports.manager.getRepository(Addresses_1.default);
//# sourceMappingURL=dataSource.js.map