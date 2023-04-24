"use strict";
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
const isAddressIdExist = async (userId, addressId) => {
    const addressAvailable = await (0, addressRepository_1.getUserAddressById)(userId, addressId);
    return !!addressAvailable;
};
exports.isAddressIdExist = isAddressIdExist;
const getAddressList = async (userId) => {
    const existingAddresses = await (0, addressRepository_1.getUserAdresses)(userId);
    return existingAddresses;
};
exports.getAddressList = getAddressList;
const updateOtherAddressDefaultToFalse = async (userId) => {
    const existingAddresses = await (0, exports.getAddressList)(userId);
    existingAddresses.map(async (address) => {
        await (0, addressRepository_1.updateAddressDefaultToFalse)(address.id);
    });
};
exports.updateOtherAddressDefaultToFalse = updateOtherAddressDefaultToFalse;
const oneDefaultAddressOnly = async (userId, payload) => {
    payload.isDefault = Boolean(payload.isDefault);
    if (payload.isDefault === true) {
        await (0, exports.updateOtherAddressDefaultToFalse)(userId);
    }
};
exports.oneDefaultAddressOnly = oneDefaultAddressOnly;
const addAddress = async (userId, payload) => {
    await (0, exports.oneDefaultAddressOnly)(userId, payload);
    const response = await (0, addressRepository_1.insertNewAddress)(payload, userId);
    return response;
};
exports.addAddress = addAddress;
const isAddressExist = async (userId, payload) => {
    const existingAddresses = await (0, addressRepository_1.getAddressWithExactDetails)(userId, payload);
    return { id: existingAddresses?.id, exist: !!existingAddresses };
};
exports.isAddressExist = isAddressExist;
const isAddressExistExceptSelf = async (userId, payload) => {
    const existingAddressesExceptSelf = await (0, addressRepository_1.getAddressWithExactDetailsExceptSelf)(userId, payload);
    return !!existingAddressesExceptSelf;
};
exports.isAddressExistExceptSelf = isAddressExistExceptSelf;
const updateAddress = async (userId, payload) => {
    await (0, exports.oneDefaultAddressOnly)(userId, payload);
    const response = await (0, addressRepository_1.updateAddressById)(payload);
    return response;
};
exports.updateAddress = updateAddress;
const deleteAddress = async (payload) => {
    const response = await (0, addressRepository_1.deleteAddressById)(payload.addressId);
    return response;
};
exports.deleteAddress = deleteAddress;
//# sourceMappingURL=addressServices.js.map