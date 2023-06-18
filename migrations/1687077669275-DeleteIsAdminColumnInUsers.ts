import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteIsAdminColumnInUsers1687077669275
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'is_admin');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
