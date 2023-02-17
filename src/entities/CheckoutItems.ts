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
import Orders from './Orders';

@Entity()
class CheckoutItems {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Orders, (order) => order.checkoutItems)
  @JoinColumn({ name: "order_id", referencedColumnName: "id" })
    order: Orders;

  @Column({ name: "product_id" })
    productId: string;

  @Column()
    name: string;

  @Column()
    quantity: number;

  @Column({ name: "total_price" })
    totalPrice: number;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default CheckoutItems;
