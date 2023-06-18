import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Addresses from './Addresses';
import ResetPasswordTokens from './ResetPasswordTokens';
import UserRoles from './UserRoles';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @Column({ name: 'preferred_name', nullable: true })
    preferredName: string;

  @Column({ unique: true })
    email: string;

  @Column()
    password: string;

  @Column()
    iv: string;

  @Column({ name: 'country_code' })
    countryCode: string;

  @Column({ name: 'phone_number' })
    phoneNumber: string;

  @Column({ type: 'char' })
    gender: string;

  @Column({ type: 'date' })
    dob: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => Addresses, (address) => address.user)
    addresses: Addresses;

  @OneToMany(
    () => ResetPasswordTokens,
    (resetPasswordToken) => resetPasswordToken.user,
  )
    resetPasswordTokens: ResetPasswordTokens[];

  @OneToMany(() => UserRoles, (userRole) => userRole.user)
    userRoles: UserRoles[];
}

export default Users;
