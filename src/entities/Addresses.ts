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
import States from './States';
import Users from './Users';

@Entity()
class Addresses {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Users, (user) => user.addresses, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users;

  @Column({ name: 'receiver_name' })
    receiverName: string;

  @Column({ name: 'receiver_country_code' })
    receiverCountryCode: string;

  @Column({ name: 'receiver_phone_number' })
    receiverPhoneNumber: string;

  @Column({ name: 'address_line_one' })
    addressLineOne: string;

  @Column({ name: 'address_line_two', nullable: true })
    addressLineTwo: string;

  @Column()
    postcode: string;

  @Column()
    city: string;

  @ManyToOne(() => States, (state) => state.addresses)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    state: States;

  @Column()
    country: string;

  @Column({ name: 'is_default', default: false })
    isDefault: boolean;

  @Column({ nullable: true })
    tag: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => Orders, (order) => order.address)
    orders: Orders[];
}

export default Addresses;
