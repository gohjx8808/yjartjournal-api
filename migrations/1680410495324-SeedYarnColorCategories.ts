import { MigrationInterface } from 'typeorm';
import { manager } from '../src/dataSource';
import YarnColorCategories from '../src/entities/YarnColorCategories';

export class SeedYarnColorCategories1680410495324
implements MigrationInterface {
  yarnColorCategoriesSeed = [
    'White/Yellow',
    'Brown/Grey',
    'Pink/Red',
    'Purple/Blue',
    'Green',
  ];

  public async up(): Promise<void> {
    this.yarnColorCategoriesSeed.map(async (color) => {
      await manager.getRepository(YarnColorCategories).insert({ name: color });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
