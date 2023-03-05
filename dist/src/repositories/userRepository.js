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
exports.insertNewUser = exports.getUserByEmail = exports.updateUserById = exports.getUserById = void 0;
const dataSource_1 = require("../dataSource");
const Users_1 = __importDefault(require("../entities/Users"));
const userManager = dataSource_1.manager.getRepository(Users_1.default);
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = yield userManager
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
    return userDetails;
});
exports.getUserById = getUserById;
const updateUserById = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userManager.update({ id: userId }, payload);
    return result;
});
exports.updateUserById = updateUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userManager
        .createQueryBuilder()
        .where({ email: email })
        .getOne();
    return result;
});
exports.getUserByEmail = getUserByEmail;
const insertNewUser = (payload, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield userManager.insert(Object.assign(Object.assign({}, payload), { password: encryptedPassword.content, iv: encryptedPassword.iv }));
    return response;
});
exports.insertNewUser = insertNewUser;
//# sourceMappingURL=userRepository.js.map