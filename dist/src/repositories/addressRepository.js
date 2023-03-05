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
exports.updateAddressById = exports.getAddressWithExactDetailsExceptSelf = exports.getAddressWithExactDetails = exports.getAddressWithExactDetailsQuery = exports.deleteAddressById = exports.insertNewAddress = exports.updateAddressDefaultToFalse = exports.getUserAddressById = exports.getUserAdresses = exports.getAddressByUserQuery = exports.addressManager = void 0;
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const Addresses_1 = __importDefault(require("../entities/Addresses"));
exports.addressManager = dataSource_1.manager.getRepository(Addresses_1.default);
const getAddressByUserQuery = (user) => {
    const userAddresses = exports.addressManager
        .createQueryBuilder('addresses')
        .leftJoin('addresses.user', 'user')
        .leftJoinAndSelect('addresses.state', 'state')
        .where('user.id = :id', { id: user.id });
    return userAddresses;
};
exports.getAddressByUserQuery = getAddressByUserQuery;
const getUserAdresses = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield (0, exports.getAddressByUserQuery)(user)
        .orderBy({ 'addresses.updated_at': 'DESC' })
        .getMany();
    return existingAddresses;
});
exports.getUserAdresses = getUserAdresses;
const getUserAddressById = (user, addressId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, exports.getAddressByUserQuery)(user)
        .andWhere({
        id: addressId,
    })
        .getOne();
    return result;
});
exports.getUserAddressById = getUserAddressById;
const updateAddressDefaultToFalse = (addressId) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.addressManager.update({ id: addressId }, { isDefault: false });
});
exports.updateAddressDefaultToFalse = updateAddressDefaultToFalse;
const insertNewAddress = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exports.addressManager.insert(Object.assign(Object.assign({}, payload), { user }));
    return result;
});
exports.insertNewAddress = insertNewAddress;
const deleteAddressById = (addressId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exports.addressManager
        .createQueryBuilder()
        .delete()
        .where({ id: addressId })
        .execute();
    return result;
});
exports.deleteAddressById = deleteAddressById;
const getAddressWithExactDetailsQuery = (user, payload) => {
    let filterAddressQuery = (0, exports.getAddressByUserQuery)(user).andWhere({
        receiverName: payload.receiverName,
        receiverCountryCode: payload.receiverCountryCode,
        receiverPhoneNumber: payload.receiverPhoneNumber,
        addressLineOne: payload.addressLineOne,
        postcode: payload.postcode,
        city: payload.city,
        state: payload.state,
        country: payload.country,
    });
    if (payload.addressLineTwo === null) {
        filterAddressQuery = filterAddressQuery.andWhere({
            addressLineTwo: (0, typeorm_1.IsNull)(),
        });
    }
    else {
        filterAddressQuery = filterAddressQuery.andWhere({
            addressLineTwo: payload.addressLineTwo,
        });
    }
    return filterAddressQuery;
};
exports.getAddressWithExactDetailsQuery = getAddressWithExactDetailsQuery;
const getAddressWithExactDetails = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, exports.getAddressWithExactDetailsQuery)(user, payload).getOne();
    return result;
});
exports.getAddressWithExactDetails = getAddressWithExactDetails;
const getAddressWithExactDetailsExceptSelf = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, exports.getAddressWithExactDetailsQuery)(user, payload)
        .andWhere({ id: (0, typeorm_1.Not)(payload.addressId) })
        .getOne();
    return result;
});
exports.getAddressWithExactDetailsExceptSelf = getAddressWithExactDetailsExceptSelf;
const updateAddressById = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exports.addressManager.update({ id: payload.addressId }, {
        receiverName: payload.receiverName,
        receiverCountryCode: payload.receiverCountryCode,
        receiverPhoneNumber: payload.receiverPhoneNumber,
        addressLineOne: payload.addressLineOne,
        addressLineTwo: payload.addressLineTwo,
        postcode: payload.postcode,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        isDefault: payload.isDefault,
        tag: payload.tag,
    });
    return result;
});
exports.updateAddressById = updateAddressById;
//# sourceMappingURL=addressRepository.js.map