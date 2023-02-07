/* eslint-disable @typescript-eslint/no-unused-vars */
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
class PromoCodes {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column({ name: "promo_type" })
    promoType: string;

  @Column({ name: "promo_value" })
    promoValue: number;

  @Column({ name: "use_limit", nullable: true })
    useLimit: number;

  @Column({ name: "started_at" })
    startedAt: Date;

  @Column({ name: "expired_at" })
    expiredAt: Date;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

  @OneToMany(() => Orders, (order) => order.promoCodeUsed)
    orders: Orders[];
}

export default PromoCodes;
