import Users from '../../entities/Users';
import { insertNewAddress } from '../../repositories/addressRepository';
import { insertNewCheckoutItem } from '../../repositories/checkoutItemRepository';
import { insertNewOrder } from '../../repositories/orderRepository';
import { addAddress, isAddressExist } from '../address/addressServices';
import {
  CalculateShippingFeePayload,
  CheckoutPayload,
  CheckoutProductData,
} from './typings';

export const calculateShippingFee = (payload: CalculateShippingFeePayload) => {
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

const insertCheckoutAddress = async (payload: CheckoutPayload, user: Users) => {
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
    const existingSameAddress = await isAddressExist(user, addressData);
    if (!existingSameAddress.exist) {
      addressId = (await addAddress(user, addressData)).identifiers[0].id;
    } else {
      addressId = existingSameAddress.id;
    }
  } else {
    addressId = (await insertNewAddress(addressData)).identifiers[0].id;
  }

  return addressId;
};

const insertOrderData = async (payload: CheckoutPayload, addressId: number) => {
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

const insertCheckoutItemData = (
  payload: CheckoutProductData[],
  orderId: number,
) =>
  payload.map(async (item) => {
    const response = await insertNewCheckoutItem(item, orderId);
    return response;
  });

export const checkout = async (payload: CheckoutPayload, user: Users) => {
  const addressId = await insertCheckoutAddress(payload, user);

  const order = await insertOrderData(payload, addressId);

  const checkoutItemDatas = insertCheckoutItemData(
    payload.products,
    order.identifiers[0].id,
  );

  return checkoutItemDatas;
};
