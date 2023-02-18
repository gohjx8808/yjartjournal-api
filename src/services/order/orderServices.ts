import { promoCodeRepository } from '../../dataSource';
import { CheckoutPayload } from './typings';

export const checkout = (payload: CheckoutPayload) => {
  console.log(payload);
};

export const getPromoCodeByName = async (promoCode: string) => {
  return promoCodeRepository.findOneBy({
    name: promoCode,
  });
};