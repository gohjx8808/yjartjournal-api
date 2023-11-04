"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sgMail_1 = require("../../mail/sgMail");
const UserRepository_1 = __importDefault(require("../../repositories/UserRepository"));
const addressRepository_1 = require("../../repositories/addressRepository");
const checkoutItemRepository_1 = require("../../repositories/checkoutItemRepository");
const orderRepository_1 = require("../../repositories/orderRepository");
const promoCodeRepository_1 = require("../../repositories/promoCodeRepository");
const addressServices_1 = require("../address/addressServices");
class OrderServices {
    userRepository = new UserRepository_1.default();
    calculateShippingFee = (payload) => {
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
    insertCheckoutAddress = async (payload, user) => {
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
            const existingSameAddress = await (0, addressServices_1.isAddressExist)(user.id, addressData);
            if (!existingSameAddress.exist) {
                addressId = (await (0, addressServices_1.addAddress)(user.id, addressData)).identifiers[0].id;
            }
            else {
                addressId = existingSameAddress.id;
            }
        }
        else {
            addressId = (await (0, addressRepository_1.insertNewAddress)(addressData)).identifiers[0].id;
        }
        return addressId;
    };
    insertOrderData = async (payload, addressId) => {
        const orderData = {
            buyerEmail: payload.buyerEmail,
            shippingFee: payload.shippingFee,
            promoCodeUsed: payload.promoCodeUsed,
            note: payload.note,
            paymentMethod: payload.paymentMethod,
            totalAmount: payload.totalAmount,
        };
        const response = await (0, orderRepository_1.insertNewOrder)(orderData, addressId);
        return response;
    };
    insertCheckoutItemData = (payload, orderId) => payload.map(async (item) => {
        const response = await (0, checkoutItemRepository_1.insertNewCheckoutItem)(item, orderId);
        return response;
    });
    calculateDiscount = async (promoCodeUsed, totalAmount) => {
        let discountMargin;
        let discountAmount = 0;
        if (promoCodeUsed) {
            const promoCodeDetails = await (0, promoCodeRepository_1.getPromoCodeById)(promoCodeUsed.id);
            if (promoCodeDetails.promoType === 'percent') {
                discountMargin = `${promoCodeDetails.promoValue}%`;
                discountAmount = totalAmount * (promoCodeDetails.promoValue / 100);
            }
            else {
                discountAmount = promoCodeDetails.promoValue;
            }
        }
        return { discountMargin, discountAmount };
    };
    sendPaymentEmail = async (payload, user, addressId) => {
        const bankTransferTemplateId = 'd-ce30ae1412f546d592d214d4fc8efa90';
        const tngTemplateId = 'd-13380bdf16624fb6bf11c56450dde78d';
        let buyerName = payload.buyerEmail;
        if (user) {
            const userDetails = await this.userRepository.getUserById(user.id);
            buyerName = userDetails.preferredName || userDetails.name;
        }
        const addressDetails = await (0, addressRepository_1.getAddressById)(addressId);
        const formattedProducts = payload.products.map((product) => ({
            ...product,
            totalPrice: product.totalPrice.toFixed(2),
        }));
        const discountDetails = await this.calculateDiscount(payload.promoCodeUsed, payload.totalAmount);
        const emailMsg = {
            personalizations: [{ to: [{ email: payload.buyerEmail }] }],
            from: { email: 'yj.artjournal@gmail.com', name: 'YJ Art Journal' },
            templateId: payload.paymentMethod === 'TNG'
                ? tngTemplateId
                : bankTransferTemplateId,
            dynamicTemplateData: {
                buyerName: buyerName,
                checkoutItems: formattedProducts,
                totalAmount: payload.totalAmount.toFixed(2),
                discountMargin: discountDetails.discountMargin,
                discountAmount: discountDetails.discountAmount.toFixed(2),
                shippingFee: payload.shippingFee.toFixed(2),
                totalAfterShipping: (payload.totalAmount +
                    payload.shippingFee -
                    discountDetails.discountAmount).toFixed(2),
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
        await (0, sgMail_1.sendEmail)(emailMsg);
    };
    checkout = async (payload, user) => {
        const addressId = await this.insertCheckoutAddress(payload, user);
        const order = await this.insertOrderData(payload, addressId);
        this.insertCheckoutItemData(payload.products, order.identifiers[0].id);
        await this.sendPaymentEmail(payload, user, addressId);
        return { message: 'Order successfully created!' };
    };
}
exports.default = OrderServices;
//# sourceMappingURL=OrderServices.js.map