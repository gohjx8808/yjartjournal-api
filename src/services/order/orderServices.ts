import { addressRepository } from '../../dataSource';
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

export const checkout = async (payload: CheckoutPayload) => {
  let addressId = payload.addressId;

  if (!addressId) {
    addressId = (await addressRepository.insert(payload)).identifiers[0].id;
  }

  return addressId;
};
