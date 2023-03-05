import { manager } from '../dataSource';
import Addresses from '../entities/Addresses';
import Orders from '../entities/Orders';
import PromoCodes from '../entities/PromoCodes';
import { OrderInsertPayload } from '../services/order/typings';

const orderManager = manager.getRepository(Orders);

export const getOrderByAddressPromoCodeUsed = async (
  address: Addresses,
  promoCode: PromoCodes,
) => {
  const result = await orderManager.findBy({
    address: address,
    promoCodeUsed: promoCode,
  });

  return result;
};

export const insertNewOrder = async (
  payload: OrderInsertPayload,
  addressId: number,
) => {
  const result = await orderManager.insert({
    ...payload,
    address: { id: addressId },
    orderStatus: { id: 1 },
  });

  return result;
};
