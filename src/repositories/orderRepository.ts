import { manager } from '../dataSource';
import Addresses from '../entities/Addresses';
import Orders from '../entities/Orders';
import PromoCodes from '../entities/PromoCodes';
import { OrderInsertPayload } from '../services/order/typings';

const orderManager = manager.getRepository(Orders);

export const getOrderByAddressPromoCodeUsed = (
  address: Addresses,
  promoCode: PromoCodes,
) =>
  orderManager.findBy({
    address: address,
    promoCodeUsed: promoCode,
  });

export const insertNewOrder = (
  payload: OrderInsertPayload,
  addressId: number,
) =>
  orderManager.insert({
    ...payload,
    address: { id: addressId },
    orderStatus: { id: 1 },
  });
