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
exports.deleteAddress = exports.updateAddress = exports.isAddressExistExceptSelf = exports.isAddressExist = exports.addAddress = exports.oneDefaultAddressOnly = exports.updateOtherAddressDefaultToFalse = exports.getAddressList = exports.isAddressIdExist = exports.validateTag = void 0;
const addressRepository_1 = require("../../repositories/addressRepository");
const validateTag = (tag) => {
    if (tag !== 'Work' && tag !== 'Home') {
        return false;
    }
    return true;
};
exports.validateTag = validateTag;
const isAddressIdExist = (user, addressId) => __awaiter(void 0, void 0, void 0, function* () {
    const addressAvailable = yield (0, addressRepository_1.getUserAddressById)(user, addressId);
    return !!addressAvailable;
});
exports.isAddressIdExist = isAddressIdExist;
const getAddressList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield (0, addressRepository_1.getUserAdresses)(user);
    return existingAddresses;
});
exports.getAddressList = getAddressList;
const updateOtherAddressDefaultToFalse = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield (0, exports.getAddressList)(user);
    existingAddresses.map((address) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, addressRepository_1.updateAddressDefaultToFalse)(address.id);
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
    const response = yield (0, addressRepository_1.insertNewAddress)(payload, user);
    return response;
});
exports.addAddress = addAddress;
const isAddressExist = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield (0, addressRepository_1.getAddressWithExactDetails)(user, payload);
    return { id: existingAddresses === null || existingAddresses === void 0 ? void 0 : existingAddresses.id, exist: !!existingAddresses };
});
exports.isAddressExist = isAddressExist;
const isAddressExistExceptSelf = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddressesExceptSelf = yield (0, addressRepository_1.getAddressWithExactDetailsExceptSelf)(user, payload);
    return !!existingAddressesExceptSelf;
});
exports.isAddressExistExceptSelf = isAddressExistExceptSelf;
const updateAddress = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.oneDefaultAddressOnly)(user, payload);
    const response = yield (0, addressRepository_1.updateAddressById)(payload);
    return response;
});
exports.updateAddress = updateAddress;
const deleteAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, addressRepository_1.deleteAddressById)(payload.addressId);
    return response;
});
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=addressServices.js.map