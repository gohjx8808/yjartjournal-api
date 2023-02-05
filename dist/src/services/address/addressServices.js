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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.checkAddressExistExceptSelf = exports.checkAddressExist = exports.checkAddressQuery = exports.addAddress = exports.oneDefaultAddressOnly = exports.updateOtherAddressDefaultToFalse = exports.getAddressList = exports.checkAddressIdExist = void 0;
const typeorm_1 = require("typeorm");
const dataSource_1 = require("../../dataSource");
const getUserExistingAddressQuery = (user) => {
    const existingAddresses = dataSource_1.addressRepository
        .createQueryBuilder('addresses')
        .leftJoin('addresses.user', 'user')
        .where('user.id = :id', { id: user.id });
    return existingAddresses;
};
const checkAddressIdExist = (user, addressId) => __awaiter(void 0, void 0, void 0, function* () {
    const addressAvailable = yield getUserExistingAddressQuery(user)
        .andWhere({
        id: addressId,
    })
        .getExists();
    return addressAvailable;
});
exports.checkAddressIdExist = checkAddressIdExist;
const getAddressList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield getUserExistingAddressQuery(user).getMany();
    return existingAddresses;
});
exports.getAddressList = getAddressList;
const updateOtherAddressDefaultToFalse = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield (0, exports.getAddressList)(user);
    existingAddresses.map((address) => __awaiter(void 0, void 0, void 0, function* () {
        yield dataSource_1.addressRepository.update({ id: address.id }, { isDefault: false });
    }));
});
exports.updateOtherAddressDefaultToFalse = updateOtherAddressDefaultToFalse;
const oneDefaultAddressOnly = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.isDefault = Boolean(payload.isDefault);
    if (payload.isDefault === true) {
        yield (0, exports.updateOtherAddressDefaultToFalse)(user);
    }
});
exports.oneDefaultAddressOnly = oneDefaultAddressOnly;
const addAddress = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.oneDefaultAddressOnly)(user, payload);
    const response = yield dataSource_1.addressRepository.insert(Object.assign({ user }, payload));
    return response;
});
exports.addAddress = addAddress;
const checkAddressQuery = (user, payload) => {
    const filterAddressQuery = getUserExistingAddressQuery(user).andWhere({
        receiverName: payload.receiverName,
        receiverCountryCode: payload.receiverCountryCode,
        receiverPhoneNumber: payload.receiverPhoneNumber,
        addressLineOne: payload.addressLineOne,
        addressLineTwo: payload.addressLineTwo,
        postcode: payload.postcode,
        city: payload.city,
        state: payload.state,
        country: payload.country,
    });
    return filterAddressQuery;
};
exports.checkAddressQuery = checkAddressQuery;
const checkAddressExist = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield (0, exports.checkAddressQuery)(user, payload).getMany();
    return existingAddresses.length > 0;
});
exports.checkAddressExist = checkAddressExist;
const checkAddressExistExceptSelf = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddressesExceptSelf = yield (0, exports.checkAddressQuery)(user, payload)
        .andWhere({ id: (0, typeorm_1.Not)(payload.addressId) })
        .getMany();
    return existingAddressesExceptSelf.length > 0;
});
exports.checkAddressExistExceptSelf = checkAddressExistExceptSelf;
const updateAddress = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.oneDefaultAddressOnly)(user, payload);
    const response = yield dataSource_1.addressRepository.update({ id: payload.addressId }, {
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
    return response;
});
exports.updateAddress = updateAddress;
const deleteAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dataSource_1.addressRepository
        .createQueryBuilder()
        .delete()
        .where({ id: payload.addressId })
        .execute();
    return response;
});
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=addressServices.js.map