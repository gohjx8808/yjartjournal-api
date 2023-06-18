import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Orders from './Orders';

@Entity()
class OrderStatuses {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => Orders, (order) => order.orderStatus)
    orders: Orders[];
}

export default OrderStatuses;
