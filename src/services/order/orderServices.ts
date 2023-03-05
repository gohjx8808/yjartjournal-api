import { addressRepository } from '../../dataSource';
import { Users } from '../../entities/Users';
import { addAddress, isAddressExist } from '../address/addressServices';
import { CalculateShippingFeePayload, CheckoutPayload } from './typings';

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
    addressId = (await addressRepository.insert(payload)).identifiers[0].id;
  }

  return addressId;
};

export const checkout = async (payload: CheckoutPayload, user: Users) => {
  const addressId = await insertCheckoutAddress(payload, user);

  return addressId;
};
