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
import Users from './Users';

@Entity()
class ResetPasswordTokens {
  @PrimaryGeneratedColumn()
    id: number;

  @ManyToOne(() => Users, (user) => user.resetPasswordTokens)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
    user: Users;

  @Column()
    token: string;

  @Column({ name: "expired_at", type: "date" })
    expiredAt: Date;

  @Column({ name: "is_used", default: false })
    isUsed: boolean;

  @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}

export default ResetPasswordTokens;
