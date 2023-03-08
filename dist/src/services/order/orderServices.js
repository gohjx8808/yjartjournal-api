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
const sgMail_1 = require("../../mail/sgMail");
const addressRepository_1 = require("../../repositories/addressRepository");
const checkoutItemRepository_1 = require("../../repositories/checkoutItemRepository");
const orderRepository_1 = require("../../repositories/orderRepository");
const userRepository_1 = require("../../repositories/userRepository");
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
const insertOrderData = (payload, addressId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = {
        buyerEmail: payload.buyerEmail,
        shippingFee: payload.shippingFee,
        promoCodeUsed: payload.promoCodeUsed,
        note: payload.note,
        paymentMethod: payload.paymentMethod,
        totalAmount: payload.totalAmount,
    };
    const response = yield (0, orderRepository_1.insertNewOrder)(orderData, addressId);
    return response;
});
const insertCheckoutItemData = (payload, orderId) => payload.map((item) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, checkoutItemRepository_1.insertNewCheckoutItem)(item, orderId);
    return response;
}));
const checkout = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const addressId = yield insertCheckoutAddress(payload, user);
    const order = yield insertOrderData(payload, addressId);
    insertCheckoutItemData(payload.products, order.identifiers[0].id);
    const addressDetails = yield (0, addressRepository_1.getAddressById)(addressId);
    const formattedProducts = payload.products.map((product) => (Object.assign(Object.assign({}, product), { totalPrice: product.totalPrice.toFixed(2) })));
    const bankTransferTemplateId = 'd-ce30ae1412f546d592d214d4fc8efa90';
    const tngTemplateId = 'd-13380bdf16624fb6bf11c56450dde78d';
    let buyerName = payload.buyerEmail;
    if (user) {
        const userDetails = yield (0, userRepository_1.getUserById)(user.id);
        buyerName = userDetails.preferredName || userDetails.name;
    }
    const emailMsg = {
        personalizations: [{ to: [{ email: payload.buyerEmail }] }],
        from: { email: 'yj.artjournal@gmail.com', name: 'YJ Art Journal' },
        templateId: payload.paymentMethod === 'TNG' ? tngTemplateId : bankTransferTemplateId,
        dynamicTemplateData: {
            buyerName: buyerName,
            checkoutItems: formattedProducts,
            totalAmount: payload.totalAmount.toFixed(2),
            shippingFee: payload.shippingFee.toFixed(2),
            totalAfterShipping: (payload.totalAmount + payload.shippingFee).toFixed(2),
            note: payload.note,
            receiverName: addressDetails.receiverName,
            receiverContact: `+${addressDetails.receiverCountryCode} ${addressDetails.receiverPhoneNumber}`,
            receiverAddress: `${addressDetails.addressLineOne}, ${addressDetails.addressLineTwo
                ? addressDetails.addressLineTwo + ','
                : ''} ` +
                `${addressDetails.postcode} ${addressDetails.city}, ${addressDetails.state.name} ` +
                `${addressDetails.country}`,
        },
    };
    yield (0, sgMail_1.sendEmail)(emailMsg);
    return addressDetails;
});
exports.checkout = checkout;
//# sourceMappingURL=orderServices.js.map