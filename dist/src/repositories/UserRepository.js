"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = require("../dataSource");
const Users_1 = __importDefault(require("../entities/Users"));
const userManager = dataSource_1.manager.getRepository(Users_1.default);
class UserRepository {
    getUserById = (userId) => userManager
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
    updateUserById = (userId, payload) => userManager.update({ id: userId }, payload);
    getUserByEmail = (email) => userManager.createQueryBuilder().where({ email: email }).getOne();
    insertNewUser = (payload, encryptedPassword) => userManager.insert({
        ...payload,
        password: encryptedPassword.content,
        iv: encryptedPassword.iv,
    });
    updatePasswordByUserId = async (userId, newEncryptedPassword) => {
        await userManager.update({ id: userId }, { password: newEncryptedPassword.content, iv: newEncryptedPassword.iv });
    };
    getAll = (sorting) => {
        return userManager.find({
            relations: ['userRoles.role', 'addresses'],
            order: { [sorting.name]: sorting.order },
        });
    };
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map