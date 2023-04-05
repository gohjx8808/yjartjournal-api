/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class SortOptions {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default SortOptions;
