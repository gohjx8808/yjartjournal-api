/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import YarnStocks from './YarnStocks';

@Entity()
class YarnColorCategories {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @CreateDateColumn({ name: "created_at", select: false })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
    updatedAt: Date;

  @OneToMany(() => YarnStocks, (yarnStocks) => yarnStocks.yarnColorCategory)
    yarnStocks: YarnStocks;
}

export default YarnColorCategories;
