import PromoCodeRepository from '../../repositories/PromoCodeRepository';
import { getOrderByAddressPromoCodeUsed } from '../../repositories/orderRepository';
import AddressServices from '../address/AddressServices';

export default class PromoCodeServices {
  private addressServices = new AddressServices();

  private promoCodeRepository = new PromoCodeRepository();

  getByName = (promoCode: string) =>
    this.promoCodeRepository.getPromoCodeByName(promoCode);

  getById = (promoCodeId: number) =>
    this.promoCodeRepository.getPromoCodeById(promoCodeId);

  validatePromoCode = async (promoCode: string, userId: number) => {
    const foundPromoCode = await this.getByName(promoCode);

    if (!foundPromoCode) {
      return { success: false, message: 'Invalid promo code.' };
    }

    const currentDate = new Date();

    if (currentDate < foundPromoCode.startedAt) {
      return { success: false, message: 'Promo is not started.' };
    }

    if (currentDate > foundPromoCode.expiredAt) {
      return { success: false, message: 'Promo expired.' };
    }

    const userAddresses = await this.addressServices.getAddressList(userId);
    let promoCodeUsedAmount = 0;
    userAddresses.map(async (address) => {
      const addressPromoCode = await getOrderByAddressPromoCodeUsed(
        address,
        foundPromoCode,
      );

      promoCodeUsedAmount += addressPromoCode.length;
    });

    if (promoCodeUsedAmount > foundPromoCode.useLimit) {
      return { success: false, message: 'Promo limit exceeded.' };
    }

    return { success: true, message: '' };
  };
}
