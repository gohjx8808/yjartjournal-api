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
exports.checkout = exports.calculateShippingFee = void 0;
const addressRepository_1 = require("../../repositories/addressRepository");
const addressServices_1 = require("../address/addressServices");
const calculateShippingFee = (payload) => {
    const stateId = payload.state.id;
    const totalAmount = payload.totalAmount;
    const eastMalaysiaStateId = [4, 5, 7];
    if (eastMalaysiaStateId.includes(stateId)) {
        if (totalAmount >= 150) {
            return 0;
        }
        else {
            return 15;
        }
    }
    else {
        if (totalAmount >= 80) {
            return 0;
        }
        else {
            return 8;
        }
    }
};
exports.calculateShippingFee = calculateShippingFee;
const insertCheckoutAddress = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    let addressId = payload.addressId;
    const addressData = {
        receiverName: payload.receiverName,
        receiverCountryCode: payload.receiverCountryCode,
        receiverPhoneNumber: payload.receiverPhoneNumber,
        addressLineOne: payload.addressLineOne,
        addressLineTwo: payload.addressLineTwo,
        postcode: payload.postcode,
        city: payload.city,
        state: payload.state,
        country: payload.country,
        isDefault: false,
    };
    if (user && payload.addToAddressBook) {
        const existingSameAddress = yield (0, addressServices_1.isAddressExist)(user, addressData);
        if (!existingSameAddress.exist) {
            addressId = (yield (0, addressServices_1.addAddress)(user, addressData)).identifiers[0].id;
        }
        else {
            addressId = existingSameAddress.id;
        }
    }
    else {
        addressId = (yield (0, addressRepository_1.insertNewAddress)(addressData)).identifiers[0].id;
    }
    return addressId;
});
const checkout = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const addressId = yield insertCheckoutAddress(payload, user);
    return addressId;
});
exports.checkout = checkout;
//# sourceMappingURL=orderServices.js.map