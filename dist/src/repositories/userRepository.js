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
exports.updatePasswordByUserId = exports.insertNewUser = exports.getUserByEmail = exports.updateUserById = exports.getUserById = void 0;
const dataSource_1 = require("../dataSource");
const Users_1 = __importDefault(require("../entities/Users"));
const userManager = dataSource_1.manager.getRepository(Users_1.default);
const getUserById = (userId) => userManager
    .createQueryBuilder()
    .where({ id: userId })
    .select([
    "Users.id",
    "Users.name",
    "Users.preferredName",
    "Users.email",
    "Users.countryCode",
    "Users.phoneNumber",
    "Users.gender",
    "Users.dob",
])
    .getOne();
exports.getUserById = getUserById;
const updateUserById = (userId, payload) => userManager.update({ id: userId }, payload);
exports.updateUserById = updateUserById;
const getUserByEmail = (email) => userManager.createQueryBuilder().where({ email: email }).getOne();
exports.getUserByEmail = getUserByEmail;
const insertNewUser = (payload, encryptedPassword) => userManager.insert(Object.assign(Object.assign({}, payload), { password: encryptedPassword.content, iv: encryptedPassword.iv }));
exports.insertNewUser = insertNewUser;
const updatePasswordByUserId = (userId, newEncryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    yield userManager.update({ id: userId }, { password: newEncryptedPassword.content, iv: newEncryptedPassword.iv });
});
exports.updatePasswordByUserId = updatePasswordByUserId;
//# sourceMappingURL=userRepository.js.map