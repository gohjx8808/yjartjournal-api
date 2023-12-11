import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Orders from './Orders';
import PromoTypes from './PromoTypes';

@Entity()
class PromoCodes {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @ManyToOne(() => PromoTypes, (promoType) => promoType.promoCodes)
  @JoinColumn({ name: 'promo_type_id', referencedColumnName: 'id' })
    promoType: PromoTypes;

  @Column({ name: 'promo_value' })
    promoValue: number;

  @Column({ name: 'use_limit', nullable: true })
    useLimit: number;

  @Column({ name: 'started_at' })
    startedAt: Date;

  @Column({ name: 'expired_at' })
    expiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => Orders, (order) => order.promoCodeUsed)
    orders: Orders[];
}

export default PromoCodes;
