import { MigrationInterface } from "typeorm";
import { manager } from "../src/dataSource";
import YarnCategories from "../src/entities/YarnCategories";

export class SeedYarnCategories1680409712499 implements MigrationInterface {
  yarnCategoriesSeed = [
    "5ply Cotton Yarn",
    "Chenille Velvet Yarn",
    "Coral Yarn",
  ];

  public async up(): Promise<void> {
    this.yarnCategoriesSeed.map(async (category) => {
      await manager.getRepository(YarnCategories).insert({ name: category });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
