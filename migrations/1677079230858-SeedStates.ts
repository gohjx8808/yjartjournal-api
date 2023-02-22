import { MigrationInterface } from 'typeorm';
import { stateRepository } from '../src/dataSource';

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
      await stateRepository.insert({ name: state });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
