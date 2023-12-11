import { MigrationInterface } from 'typeorm';
import { manager } from '../src/dataSource';
import PromoTypes from '../src/entities/PromoTypes';

export class SeedPromoTypes1702252889920 implements MigrationInterface {
  public async up(): Promise<void> {
    const promoTypesSeed = ['Percent', 'Amount'];

    promoTypesSeed.map(async (promoType) => {
      await manager.getRepository(PromoTypes).insert({ name: promoType });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
