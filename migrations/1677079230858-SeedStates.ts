import { MigrationInterface } from 'typeorm';
import { manager } from '../src/dataSource';
import States from '../src/entities/States';

export class SeedStates1677079230858 implements MigrationInterface {
  states = [
    'Perlis',
    'Penang',
    'Kedah',
    'Perak',
    'Pahang',
    'Selangor',
    'Negeri Sembilan',
    'Melaka',
    'Johor',
    'Kelantan',
    'Terengganu',
    'Sabah',
    'Sarawak',
    'Wilayah Persekutuan Kuala Lumpur',
    'Wilayah Persekutuan Labuan',
  ];

  public async up(): Promise<void> {
    this.states.map(async (state) => {
      await manager.getRepository(States).insert({ name: state });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
