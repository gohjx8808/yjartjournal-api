/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column({ name: "preferred_name", nullable: true })
    preferredName: string;

  @Column({ unique: true })
    email: string;

  @Column()
    password: string;

  @Column()
    iv: string;

  @Column({ name: "country_code" })
    countryCode: string;

  @Column({ name: "phone_number" })
    phoneNumber: string;

  @Column({ type: "char" })
    gender: string;

  @Column({ type: "date" })
    dob: string;

  @Column({ name: "is_admin", default: false })
    isAdmin: boolean;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}
