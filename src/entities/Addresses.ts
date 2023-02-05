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
import { Users } from './Users';

@Entity()
class Addresses {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Users, (user) => user.addresses, { nullable: true })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: Users;

  @Column({ name: "receiver_name" })
    receiverName: string;

  @Column({ name: "receiver_country_code" })
    receiverCountryCode: string;

  @Column({ name: "receiver_phone_number" })
    receiverPhoneNumber: string;

  @Column({ name: "address_line_one" })
    addressLineOne: string;

  @Column({ name: "address_line_two", nullable: true })
    addressLineTwo: string;

  @Column()
    postcode: string;

  @Column()
    city: string;

  @Column()
    state: string;

  @Column()
    country: string;

  @Column({ name: "is_default" })
    isDefault: boolean;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default Addresses;
