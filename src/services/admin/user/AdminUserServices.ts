import Users from '../../../entities/Users';
import { encrypt } from '../../../helpers/cryptoHelper';
import UserRepository from '../../../repositories/UserRepository';
import UserRolesRepository from '../../../repositories/UserRolesRepository';
import RoleRepository from '../../../repositories/RoleRepository';
import {
  AddNewUserPayload,
  AddUserRolePayload,
  DeleteUserPayload,
  DeleteUserRolePayload,
  GetUserListPayload,
  SortByOption,
  UpdateUserPayload,
} from './typings';

export default class AdminUserServices {
  private userRepository = new UserRepository();

  private roleRepository = new RoleRepository();

  private userRolesRepository = new UserRolesRepository();

  getAll = async (payload: GetUserListPayload) => {
    const pagination = payload.pagination;
    const search = payload.filter.toLowerCase();
    let sorting: SortByOption;

    if (payload.sortBy.order === '') {
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

    let allUsers = await this.userRepository.getAll(sorting);

    if (search) {
      allUsers = this.filterUserList(allUsers, search);
    }
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
          gender: this.formatGender(user.gender),
        };
      });

    return {
      users,
      totalFiltered: allUsers.length,
    };
  };

  private formatGender(gender: string) {
    return gender === 'M' ? 'Male' : 'Female';
  }

  private filterUserList(userList: Users[], search: string) {
    return userList.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.preferredName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        this.formatGender(user.gender).toLowerCase().includes(search) ||
        user.dob.includes(search) ||
        `${user.countryCode} ${user.phoneNumber}`.includes(search),
    );
  }

  addNew = async (payload: AddNewUserPayload) => {
    const encryptedPassword = encrypt(process.env.DEFAULT_PASSWORD);

    const user = await this.userRepository.insertNewUser(
      payload,
      encryptedPassword,
    );

    payload.roleIds.map(async (roleId) => {
      await this.userRolesRepository.insertNew(user.identifiers[0].id, roleId);
    });

    return user;
  };

  update(payload: UpdateUserPayload) {
    const { userId, ...userDetails } = payload;
    return this.userRepository.updateUserById(userId, userDetails);
  }

  delete = (payload: DeleteUserPayload) =>
    this.userRepository.deleteById(payload.userId);

  getFormOptions = async () => {
    const roles = await this.roleRepository.getAll();

    return {
      roles,
      gender: [
        { id: 'M', name: 'Male' },
        { id: 'F', name: 'Female' },
      ],
    };
  };

  addRole = (payload: AddUserRolePayload) =>
    this.userRolesRepository.insertNew(payload.userId, payload.roleId);

  deleteRole = (payload: DeleteUserRolePayload) =>
    this.userRolesRepository.deleteById(payload.userRoleId);
}
