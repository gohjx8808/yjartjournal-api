/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import YarnCategories from './YarnCategories';
import YarnColorCategories from './YarnColorCategories';

@Entity()
class YarnStocks {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => YarnCategories, (yarnCategory) => yarnCategory.yarnStocks)
  @JoinColumn({ name: "yarn_category_id", referencedColumnName: "id" })
    yarnCategory: YarnCategories;

  @ManyToOne(
    () => YarnColorCategories,
    (yarnColorCategory) => yarnColorCategory.yarnStocks
  )
  @JoinColumn({ name: "yarn_color_category_id", referencedColumnName: "id" })
    yarnColorCategory: YarnColorCategories;

  @Column({ name: "detailed_color" })
    detailedColor: string;

  @Column({ name: "cost_per_item", type: "float" })
    costPerItem: number;

  @Column({ name: "in_stock_quantity" })
    inStockQuantity: number;

  @Column({ name: "used_quantity", default: 0 })
    usedQuantity: number;

  @Column({ name: "reorder_level" })
    reorderLevel: number;

  @Column({ name: "last_ordered_at", type: "date", nullable: true })
    lastOrderedAt?: Date;

  @Column({ name: "image_url", nullable: true })
    imageUrl?: string;

  @Column({ name: "image_id", nullable: true })
    imageId?: string;

  @CreateDateColumn({ name: "created_at", select: false })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
    updatedAt: Date;
}

export default YarnStocks;
