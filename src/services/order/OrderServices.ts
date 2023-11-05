import { MailDataRequired } from '@sendgrid/mail';
import { sendEmail } from '../../mail/sgMail';
import UserRepository from '../../repositories/UserRepository';
import { insertNewCheckoutItem } from '../../repositories/checkoutItemRepository';
import { insertNewOrder } from '../../repositories/orderRepository';
import { getPromoCodeById } from '../../repositories/promoCodeRepository';
import { OptionData } from '../../typings';
import { AuthenticatedUserData } from '../user/typings';
import AddressServices from '../address/AddressServicesa';
import AddressRepository from '../../repositories/AddressRepositorya';
import {
  CalculateShippingFeePayload,
  CheckoutPayload,
  CheckoutProductData,
} from './typings';

export default class OrderServices {
  private userRepository = new UserRepository();

  private addressServices = new AddressServices();

  private addressRepository = new AddressRepository();

  calculateShippingFee = (payload: CalculateShippingFeePayload) => {
    const stateId = payload.state.id;
    const totalAmount = payload.totalAmount;

    const eastMalaysiaStateId = [4, 5, 7];

    if (eastMalaysiaStateId.includes(stateId)) {
      if (totalAmount >= 150) {
        return 0;
      } else {
        return 15;
      }
    } else {
      if (totalAmount >= 80) {
        return 0;
      } else {
        return 8;
      }
    }
  };

  private insertCheckoutAddress = async (
    payload: CheckoutPayload,
    user: AuthenticatedUserData,
  ) => {
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
      const existingSameAddress = await this.addressServices.isAddressExist(
        user.id,
        addressData,
      );
      if (!existingSameAddress.exist) {
        addressId = (
          await this.addressServices.addAddress(user.id, addressData)
        ).identifiers[0].id;
      } else {
        addressId = existingSameAddress.id;
      }
    } else {
      addressId = (await this.addressRepository.insertNewAddress(addressData))
        .identifiers[0].id;
    }

    return addressId;
  };

  private insertOrderData = async (
    payload: CheckoutPayload,
    addressId: number,
  ) => {
    const orderData = {
      buyerEmail: payload.buyerEmail,
      shippingFee: payload.shippingFee,
      promoCodeUsed: payload.promoCodeUsed,
      note: payload.note,
      paymentMethod: payload.paymentMethod,
      totalAmount: payload.totalAmount,
    };

    const response = await insertNewOrder(orderData, addressId);

    return response;
  };

  private insertCheckoutItemData = (
    payload: CheckoutProductData[],
    orderId: number,
  ) =>
    payload.map(async (item) => {
      const response = await insertNewCheckoutItem(item, orderId);
      return response;
    });

  private calculateDiscount = async (
    promoCodeUsed: OptionData,
    totalAmount: number,
  ) => {
    let discountMargin;
    let discountAmount = 0;
    if (promoCodeUsed) {
      const promoCodeDetails = await getPromoCodeById(promoCodeUsed.id);
      if (promoCodeDetails.promoType === 'percent') {
        discountMargin = `${promoCodeDetails.promoValue}%`;
        discountAmount = totalAmount * (promoCodeDetails.promoValue / 100);
      } else {
        discountAmount = promoCodeDetails.promoValue;
      }
    }

    return { discountMargin, discountAmount };
  };

  private sendPaymentEmail = async (
    payload: CheckoutPayload,
    user: AuthenticatedUserData,
    addressId: number,
  ) => {
    const bankTransferTemplateId = 'd-ce30ae1412f546d592d214d4fc8efa90';
    const tngTemplateId = 'd-13380bdf16624fb6bf11c56450dde78d';

    let buyerName = payload.buyerEmail;
    if (user) {
      const userDetails = await this.userRepository.getUserById(user.id);
      buyerName = userDetails.preferredName || userDetails.name;
    }

    const addressDetails = await this.addressRepository.getAddressById(
      addressId,
    );

    const formattedProducts = payload.products.map((product) => ({
      ...product,
      totalPrice: product.totalPrice.toFixed(2),
    }));

    const discountDetails = await this.calculateDiscount(
      payload.promoCodeUsed,
      payload.totalAmount,
    );

    const emailMsg: MailDataRequired = {
      personalizations: [{ to: [{ email: payload.buyerEmail }] }],
      from: { email: 'yj.artjournal@gmail.com', name: 'YJ Art Journal' },
      templateId:
        payload.paymentMethod === 'TNG'
          ? tngTemplateId
          : bankTransferTemplateId,
      dynamicTemplateData: {
        buyerName: buyerName,
        checkoutItems: formattedProducts,
        totalAmount: payload.totalAmount.toFixed(2),
        discountMargin: discountDetails.discountMargin,
        discountAmount: discountDetails.discountAmount.toFixed(2),
        shippingFee: payload.shippingFee.toFixed(2),
        totalAfterShipping: (
          payload.totalAmount +
          payload.shippingFee -
          discountDetails.discountAmount
        ).toFixed(2),
        note: payload.note,
        receiverName: addressDetails.receiverName,
        receiverContact: `+${addressDetails.receiverCountryCode} ${addressDetails.receiverPhoneNumber}`,
        receiverAddress:
          `${addressDetails.addressLineOne}, ${
            addressDetails.addressLineTwo
              ? addressDetails.addressLineTwo + ','
              : ''
          } ` +
          `${addressDetails.postcode} ${addressDetails.city}, ${addressDetails.state.name} ` +
          `${addressDetails.country}`,
      },
    };

    await sendEmail(emailMsg);
  };

  checkout = async (payload: CheckoutPayload, user: AuthenticatedUserData) => {
    const addressId = await this.insertCheckoutAddress(payload, user);

    const order = await this.insertOrderData(payload, addressId);

    this.insertCheckoutItemData(payload.products, order.identifiers[0].id);

    await this.sendPaymentEmail(payload, user, addressId);

    return { message: 'Order successfully created!' };
  };
}
