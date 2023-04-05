import { MigrationInterface } from 'typeorm';
import { manager } from '../src/dataSource';
import OrderStatuses from '../src/entities/OrderStatuses';

export class SeedOrderStatuses1675693903490 implements MigrationInterface {
  orderStatusesSeed = [
    { name: 'Pending Payment' },
    { name: 'Crocheting' },
    { name: 'Shipped' },
    { name: 'Delivered' },
  ];

  public async up(): Promise<void> {
    await manager.getRepository(OrderStatuses).save(this.orderStatusesSeed);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
