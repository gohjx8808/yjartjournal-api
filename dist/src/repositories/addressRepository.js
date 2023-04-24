"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAddressById = exports.updateAddressById = exports.getAddressWithExactDetailsExceptSelf = exports.getAddressWithExactDetails = exports.getAddressWithExactDetailsQuery = exports.deleteAddressById = exports.insertNewAddress = exports.updateAddressDefaultToFalse = exports.getUserAddressById = exports.getUserAdresses = exports.getAddressByUserIdQuery = exports.addressManager = void 0;
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../dataSource");
const Addresses_1 = __importDefault(require("../entities/Addresses"));
exports.addressManager = dataSource_1.manager.getRepository(Addresses_1.default);
const getAddressByUserIdQuery = (userId) => exports.addressManager
    .createQueryBuilder('addresses')
    .leftJoin('addresses.user', 'user')
    .leftJoinAndSelect('addresses.state', 'state')
    .where('user.id = :id', { id: userId });
exports.getAddressByUserIdQuery = getAddressByUserIdQuery;
const getUserAdresses = (userId) => (0, exports.getAddressByUserIdQuery)(userId)
    .orderBy({ 'addresses.updated_at': 'DESC' })
    .getMany();
exports.getUserAdresses = getUserAdresses;
const getUserAddressById = (userId, addressId) => (0, exports.getAddressByUserIdQuery)(userId)
    .andWhere({
    id: addressId,
})
    .getOne();
exports.getUserAddressById = getUserAddressById;
const updateAddressDefaultToFalse = (addressId) => exports.addressManager.update({ id: addressId }, { isDefault: false });
exports.updateAddressDefaultToFalse = updateAddressDefaultToFalse;
const insertNewAddress = (payload, userId) => exports.addressManager.insert({
    ...payload,
    user: { id: userId },
});
exports.insertNewAddress = insertNewAddress;
const deleteAddressById = (addressId) => exports.addressManager
    .createQueryBuilder()
    .delete()
    .where({ id: addressId })
    .execute();
exports.deleteAddressById = deleteAddressById;
const getAddressWithExactDetailsQuery = (userId, payload) => {
    let filterAddressQuery = (0, exports.getAddressByUserIdQuery)(userId).andWhere({
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
const getAddressWithExactDetails = (userId, payload) => (0, exports.getAddressWithExactDetailsQuery)(userId, payload).getOne();
exports.getAddressWithExactDetails = getAddressWithExactDetails;
const getAddressWithExactDetailsExceptSelf = (userId, payload) => (0, exports.getAddressWithExactDetailsQuery)(userId, payload)
    .andWhere({ id: (0, typeorm_1.Not)(payload.addressId) })
    .getOne();
exports.getAddressWithExactDetailsExceptSelf = getAddressWithExactDetailsExceptSelf;
const updateAddressById = (payload) => exports.addressManager.update({ id: payload.addressId }, {
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
exports.updateAddressById = updateAddressById;
const getAddressById = (addressId) => exports.addressManager.findOne({ where: { id: addressId }, relations: ['state'] });
exports.getAddressById = getAddressById;
//# sourceMappingURL=addressRepository.js.map