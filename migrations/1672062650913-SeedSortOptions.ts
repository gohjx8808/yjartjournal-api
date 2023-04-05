import { MigrationInterface } from "typeorm";
import { dataSource } from "../src/dataSource";
import SortOptions from "../src/entities/SortOptions";

export class SeedSortOptions1672062650913 implements MigrationInterface {
  SortOptionsSeed = [
    {
      name: "Name: A to Z",
    },
    {
      name: "Name: Z to A",
    },
    {
      name: "Price: Low to High",
    },
    {
      name: "Price: High to Low",
    },
  ];

  public async up(): Promise<void> {
    await dataSource.manager
      .getRepository(SortOptions)
      .save(this.SortOptionsSeed);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
