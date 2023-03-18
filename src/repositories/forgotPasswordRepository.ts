import { manager } from '../dataSource';
import ResetPasswordTokens from '../entities/ResetPasswordTokens';
import Users from '../entities/Users';

export const resetPasswordManager = manager.getRepository(ResetPasswordTokens);

export const insertNewResetPasswordToken = async (
  user: Users,
  token: string,
) => {
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 1);

  await resetPasswordManager.insert({
    user,
    token,
    expiredAt,
  });

  return { token, expiredAt };
};
