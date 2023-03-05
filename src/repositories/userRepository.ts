import { manager } from '../dataSource';
import Users from '../entities/Users';
import { UpdateAccountPayload } from '../services/account/typings';
import { EncryptedPassword, SignUpPayload } from '../services/user/typings';

const userManager = manager.getRepository(Users);

export const getUserById = async (userId: number) => {
  const userDetails = await userManager
    .createQueryBuilder()
    .where({ id: userId })
    .select([
      'Users.id',
      'Users.name',
      'Users.preferredName',
      'Users.email',
      'Users.countryCode',
      'Users.phoneNumber',
      'Users.gender',
      'Users.dob',
    ])
    .getOne();

  return userDetails;
};

export const updateUserById = async (
  userId: number,
  payload: UpdateAccountPayload,
) => {
  const result = await userManager.update({ id: userId }, payload);

  return result;
};

export const getUserByEmail = async (email: string) => {
  const result = await userManager
    .createQueryBuilder()
    .where({ email: email })
    .getOne();

  return result;
};

export const insertNewUser = async (
  payload: SignUpPayload,
  encryptedPassword: EncryptedPassword,
) => {
  const response = await userManager.insert({
    ...payload,
    password: encryptedPassword.content,
    iv: encryptedPassword.iv,
  });

  return response;
};
