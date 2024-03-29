import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserRoles from './UserRoles';

export enum AssignableRoles {
  ADMIN_VIEW = 1,
  ADMIN = 2,
  CUSTOMER = 3,
}

@Entity()
export default class Roles {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  @OneToMany(() => UserRoles, (userRole) => userRole.role)
    userRoles: UserRoles[];
}
