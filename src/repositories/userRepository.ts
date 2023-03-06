import { manager } from '../dataSource';
import Users from '../entities/Users';
import { UpdateAccountPayload } from '../services/account/typings';
import { EncryptedPassword, SignUpPayload } from '../services/user/typings';

const userManager = manager.getRepository(Users);

export const getUserById = (userId: number) =>
  userManager
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

export const updateUserById = (userId: number, payload: UpdateAccountPayload) =>
  userManager.update({ id: userId }, payload);

export const getUserByEmail = (email: string) =>
  userManager.createQueryBuilder().where({ email: email }).getOne();

export const insertNewUser = (
  payload: SignUpPayload,
  encryptedPassword: EncryptedPassword,
) =>
  userManager.insert({
    ...payload,
    password: encryptedPassword.content,
    iv: encryptedPassword.iv,
  });
