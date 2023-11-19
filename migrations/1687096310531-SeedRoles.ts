import { MigrationInterface } from 'typeorm';
import { manager } from '../src/dataSource';
import Roles from '../src/entities/Roles';

export class SeedRoles1687096310531 implements MigrationInterface {
  public async up(): Promise<void> {
    const rolesSeed = ['Admin', 'Admin View', 'Customer'];

    rolesSeed.map(async (role) => {
      await manager.getRepository(Roles).insert({ name: role });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
