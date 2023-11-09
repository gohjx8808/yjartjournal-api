import { sign } from 'jsonwebtoken';
import { AssignableRoles } from '../../entities/Roles';
import { encrypt } from '../../helpers/cryptoHelper';
import UserRepository from '../../repositories/UserRepository';
import UserRolesRepository from '../../repositories/UserRolesRepository';
import {
  DbSortByOption,
  GetUserListPayload,
  SignInPayload,
  SignUpPayload,
} from './typings';

export default class UserServices {
  private userRolesRepository = new UserRolesRepository();

  private userRepository = new UserRepository();

  signUpUser = async (payload: SignUpPayload) => {
    const encryptedPassword = encrypt(payload.password);

    const user = await this.userRepository.insertNewUser(
      payload,
      encryptedPassword,
    );

    await this.userRolesRepository.insertNew(
      user.identifiers[0].id,
      AssignableRoles.CUSTOMER,
    );

    return user;
  };

  generateAccessToken = async (payload: SignInPayload) => {
    const user = await this.userRepository.getUserByEmail(payload.email);

    const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SIGN_TOKEN,
    );

    return { accessToken, user };
  };

  updateUserPassword = async (userId: number, newPassword: string) => {
    const encryptedNewPassword = encrypt(newPassword);

    await this.userRepository.updatePasswordByUserId(
      userId,
      encryptedNewPassword,
    );
  };

  getAll = async (payload: GetUserListPayload) => {
    const pagination = payload.pagination;
    let sorting: DbSortByOption;

    if (payload.sortBy.order === 'Default') {
      sorting = {
        name: 'id',
        order: 'DESC',
      };
    } else {
      sorting = {
        name: payload.sortBy.name,
        order: payload.sortBy.order,
      };
    }

    const allUsers = await this.userRepository.getAll(sorting);
    const users = allUsers
      .slice(
        pagination.page * pagination.pageSize,
        pagination.page + 1 * pagination.pageSize,
      )
      .map((user) => {
        delete user.password;
        delete user.iv;
        return {
          ...user,
          gender: user.gender === 'M' ? 'Male' : 'Female',
        };
      });

    return {
      users,
      totalFiltered: allUsers.length,
    };
  };
}
