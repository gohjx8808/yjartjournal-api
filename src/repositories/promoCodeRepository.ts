import { manager } from '../dataSource';
import PromoCodes from '../entities/PromoCodes';

const promoCodeManager = manager.getRepository(PromoCodes);

export const getPromoCodeByName = async (promoCode: string) => {
  const result = await promoCodeManager.findOneBy({
    name: promoCode,
  });

  return result;
};
