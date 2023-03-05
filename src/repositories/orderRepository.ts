import { manager } from '../dataSource';
import Addresses from '../entities/Addresses';
import Orders from '../entities/Orders';
import PromoCodes from '../entities/PromoCodes';

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
