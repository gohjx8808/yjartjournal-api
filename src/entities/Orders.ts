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
import Addresses from './Addresses';
import OrderStatuses from './OrderStatuses';

@Entity()
class Orders {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: "buyer_email" })
    buyerEmail: string;

  @ManyToOne(() => Addresses, (address) => address.id)
  @JoinColumn({ name: "address_id", referencedColumnName: "id" })
    address: Addresses;

  @ManyToOne(() => OrderStatuses, (orderStatus) => orderStatus.id)
  @JoinColumn({ name: "order_status_id", referencedColumnName: "id" })
    orderStatus: OrderStatuses;

  @Column({ name: "payment_method" })
    paymentMethod: string;

  @Column({ nullable: true })
    note: string;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default Orders;
