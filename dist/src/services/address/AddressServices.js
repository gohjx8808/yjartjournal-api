"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddressRepository_1 = __importDefault(require("../../repositories/AddressRepository"));
class AddressServices {
    addressRepository = new AddressRepository_1.default();
    validateTag = (tag) => {
        if (tag !== 'Work' && tag !== 'Home') {
            return false;
        }
        return true;
    };
    isAddressIdExist = async (userId, addressId) => {
        const addressAvailable = await this.addressRepository.getUserAddressById(userId, addressId);
        return !!addressAvailable;
    };
    getAddressList = (userId) => this.addressRepository.getUserAdresses(userId);
    updateOtherAddressDefaultToFalse = async (userId) => {
        const existingAddresses = await this.getAddressList(userId);
        existingAddresses.map(async (address) => {
            await this.addressRepository.updateAddressDefaultToFalse(address.id);
        });
    };
    oneDefaultAddressOnly = async (userId, payload) => {
        payload.isDefault = Boolean(payload.isDefault);
        if (payload.isDefault === true) {
            await this.updateOtherAddressDefaultToFalse(userId);
        }
    };
    addAddress = async (userId, payload) => {
        await this.oneDefaultAddressOnly(userId, payload);
        const response = await this.addressRepository.insertNewAddress(payload, userId);
        return response;
    };
    isAddressExist = async (userId, payload) => {
        const existingAddresses = await this.addressRepository.getAddressWithExactDetails(userId, payload);
        return { id: existingAddresses?.id, exist: !!existingAddresses };
    };
    isAddressExistExceptSelf = async (userId, payload) => {
        const existingAddressesExceptSelf = await this.addressRepository.getAddressWithExactDetailsExceptSelf(userId, payload);
        return !!existingAddressesExceptSelf;
    };
    updateAddress = async (userId, payload) => {
        await this.oneDefaultAddressOnly(userId, payload);
        const response = await this.addressRepository.updateAddressById(payload);
        return response;
    };
    deleteAddress = (payload) => this.addressRepository.deleteAddressById(payload.addressId);
}
exports.default = AddressServices;
//# sourceMappingURL=AddressServices.js.map