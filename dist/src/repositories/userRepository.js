"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewUser = exports.getUserByEmail = exports.updateUserById = exports.getUserById = void 0;
const dataSource_1 = require("../dataSource");
const Users_1 = __importDefault(require("../entities/Users"));
const userManager = dataSource_1.manager.getRepository(Users_1.default);
const getUserById = (userId) => userManager
    .createQueryBuilder()
    .where({ id: userId })
    .select([
    'Users.id',
    'Users.name',
    'Users.preferredName',
    'Users.email',
    'Users.countryCode',
    'Users.phoneNumber',
    'Users.gender',
    'Users.dob',
])
    .getOne();
exports.getUserById = getUserById;
const updateUserById = (userId, payload) => userManager.update({ id: userId }, payload);
exports.updateUserById = updateUserById;
const getUserByEmail = (email) => userManager.createQueryBuilder().where({ email: email }).getOne();
exports.getUserByEmail = getUserByEmail;
const insertNewUser = (payload, encryptedPassword) => userManager.insert(Object.assign(Object.assign({}, payload), { password: encryptedPassword.content, iv: encryptedPassword.iv }));
exports.insertNewUser = insertNewUser;
//# sourceMappingURL=userRepository.js.map