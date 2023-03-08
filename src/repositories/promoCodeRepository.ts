import { manager } from '../dataSource';
import PromoCodes from '../entities/PromoCodes';

const promoCodeManager = manager.getRepository(PromoCodes);

export const getPromoCodeByName = (promoCode: string) =>
  promoCodeManager.findOneBy({
    name: promoCode,
  });