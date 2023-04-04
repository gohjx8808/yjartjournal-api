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
class YarnCategories {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true })
    name: string;

  @CreateDateColumn({ name: "created_at", select: false })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", select: false })
    updatedAt: Date;

  @OneToMany(() => YarnStocks, (yarnStocks) => yarnStocks.yarnCategory)
    yarnStocks: YarnStocks;
}

export default YarnCategories;
