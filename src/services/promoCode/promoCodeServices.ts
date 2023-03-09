import PromoCodes from '../../entities/PromoCodes';
import { getOrderByAddressPromoCodeUsed } from '../../repositories/orderRepository';
import { getAddressList } from '../address/addressServices';

export const validatePromoCode = async (
  promoCode: PromoCodes,
  userId: number,
) => {
  if (!promoCode) {
    return { success: false, message: 'Invalid promo code.' };
  }

  const currentDate = new Date();

  if (currentDate < promoCode.startedAt) {
    return { success: false, message: 'Promo is not started.' };
  }

  if (currentDate > promoCode.expiredAt) {
    return { success: false, message: 'Promo expired.' };
  }

  const userAddresses = await getAddressList(userId);
  let promoCodeUsedAmount = 0;
  userAddresses.map(async (address) => {
    const addressPromoCode = await getOrderByAddressPromoCodeUsed(
      address,
      promoCode,
    );

    promoCodeUsedAmount += addressPromoCode.length;
  });

  if (promoCodeUsedAmount > promoCode.useLimit) {
    return { success: false, message: 'Promo limit exceeded.' };
  }

  return { success: false, message: '' };
};
