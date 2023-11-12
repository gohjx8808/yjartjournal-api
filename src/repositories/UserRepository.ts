import { manager } from '../dataSource';
import Users from '../entities/Users';
import { UpdateAccountPayload } from '../services/account/typings';
import { SortByOption } from '../services/admin/user/typings';
import { EncryptedPassword, SignUpPayload } from '../services/user/typings';

const userManager = manager.getRepository(Users);

export default class UserRepository {
  getUserById = (userId: number) =>
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

  updateUserById = (userId: number, payload: UpdateAccountPayload) =>
    userManager.update({ id: userId }, payload);

  getUserByEmail = (email: string) =>
    userManager.createQueryBuilder().where({ email: email }).getOne();

  insertNewUser = (
    payload: SignUpPayload,
    encryptedPassword: EncryptedPassword,
  ) =>
    userManager.insert({
      ...payload,
      password: encryptedPassword.content,
      iv: encryptedPassword.iv,
    });

  updatePasswordByUserId = async (
    userId: number,
    newEncryptedPassword: EncryptedPassword,
  ) => {
    await userManager.update(
      { id: userId },
      { password: newEncryptedPassword.content, iv: newEncryptedPassword.iv },
    );
  };

  getAll = (sorting: SortByOption) => {
    return userManager.find({
      relations: ['userRoles.role', 'addresses.state'],
      order: { [sorting.name]: sorting.order },
    });
  };
}
