import { manager } from '../dataSource';
import CheckoutItems from '../entities/CheckoutItems';
import { CheckoutProductData } from '../services/order/typings';

const checkoutItemManager = manager.getRepository(CheckoutItems);

export const insertNewCheckoutItem = async (
  payload: CheckoutProductData,
  orderId: number,
) => {
  const result = await checkoutItemManager.insert({
    ...payload,
    order: { id: orderId },
  });

  return result;
};
