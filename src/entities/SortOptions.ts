import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductSort {
  A_TO_Z = 1,
  Z_TO_A = 2,
  LOW_TO_HIGH = 3,
  HIGH_TO_LOW = 4,
}

@Entity()
class SortOptions {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

export default SortOptions;
