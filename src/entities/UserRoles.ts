import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Users from './Users';
import Roles from './Roles';

export enum AssignableRoles {
  ADMIN_VIEW = 1,
  ADMIN = 2,
  CUSTOMER = 3,
}

@Entity()
export default class UserRoles {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Users, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Users;

  @ManyToOne(() => Roles, (roles) => roles.userRoles)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
    role: Roles;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
