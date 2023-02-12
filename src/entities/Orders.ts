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
import PromoCodes from './PromoCodes';

@Entity()
class Orders {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: "buyer_email" })
    buyerEmail: string;

  @ManyToOne(() => Addresses, (address) => address.orders)
  @JoinColumn({ name: "address_id", referencedColumnName: "id" })
    address: Addresses;

  @Column({ name: "shipping_fee", default: 0 })
    shippingFee: number;

  @Column({ name: "total_amount" })
    totalAmount: number;

  @Column({ name: "payment_method" })
    paymentMethod: string;

  @ManyToOne(() => PromoCodes, (promoCode) => promoCode.orders)
  @JoinColumn({ name: "promo_code_used_id" })
    promoCodeUsed: PromoCodes;

  @Column({ nullable: true })
    note: string;

  @ManyToOne(() => OrderStatuses, (orderStatus) => orderStatus.orders)
  @JoinColumn({ name: "order_status_id", referencedColumnName: "id" })
    orderStatus: OrderStatuses;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default Orders;
