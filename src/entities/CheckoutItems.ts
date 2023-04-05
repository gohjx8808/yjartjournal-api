/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Orders from "./Orders";

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

  @Column("float", { name: "price_per_item", scale: 2 })
  pricePerItem: number;

  @Column()
  quantity: number;

  @Column("float", { name: "total_price", scale: 2 })
  totalPrice: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export default CheckoutItems;
