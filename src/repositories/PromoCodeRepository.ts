import { manager } from '../dataSource';
import PromoCodes from '../entities/PromoCodes';

const promoCodeManager = manager.getRepository(PromoCodes);

export default class PromoCodeRepository {
  getAll = () =>
    promoCodeManager.find({ relations: ['orders'], order: { id: 'DESC' } });

  getPromoCodeByName = (promoCode: string) =>
    promoCodeManager.findOneBy({
      name: promoCode,
    });

  getPromoCodeById = (promoCodeId: number) =>
    promoCodeManager.findOneBy({ id: promoCodeId });
}
