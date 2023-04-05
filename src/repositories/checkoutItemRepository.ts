import { manager } from "../dataSource";
import CheckoutItems from "../entities/CheckoutItems";
import { CheckoutProductData } from "../services/order/typings";

const checkoutItemManager = manager.getRepository(CheckoutItems);

export const insertNewCheckoutItem = (
  payload: CheckoutProductData,
  orderId: number
) =>
  checkoutItemManager.insert({
    ...payload,
    order: { id: orderId },
  });
