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
exports.checkAddressExist = exports.addAddress = exports.getAddressList = void 0;
const dataSource_1 = require("../../dataSource");
const getExistingAddress = (user) => {
    const existingAddresses = dataSource_1.addressRepository
        .createQueryBuilder('addresses')
        .leftJoin('addresses.user', 'user')
        .where('user.id = :id', { id: user.id });
    return existingAddresses;
};
const getAddressList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield getExistingAddress(user).getMany();
    return existingAddresses;
});
exports.getAddressList = getAddressList;
const addAddress = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.isDefault = Boolean(payload.isDefault);
    if (payload.isDefault === true) {
        const existingAddresses = yield (0, exports.getAddressList)(user);
        existingAddresses.map((address) => __awaiter(void 0, void 0, void 0, function* () {
            yield dataSource_1.addressRepository.update({ id: address.id }, { isDefault: false });
        }));
    }
    const response = yield dataSource_1.addressRepository.insert(Object.assign({ user }, payload));
    return response;
});
exports.addAddress = addAddress;
const checkAddressExist = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingAddresses = yield getExistingAddress(user)
        .andWhere({
        receiverName: payload.receiverName,
        receiverCountryCode: payload.receiverCountryCode,
        receiverPhoneNumber: payload.receiverPhoneNumber,
        addressLineOne: payload.addressLineOne,
        addressLineTwo: payload.addressLineTwo,
        postcode: payload.postcode,
        city: payload.city,
        state: payload.state,
        country: payload.country,
    })
        .getMany();
    return existingAddresses.length > 0;
});
exports.checkAddressExist = checkAddressExist;
//# sourceMappingURL=addressServices.js.map