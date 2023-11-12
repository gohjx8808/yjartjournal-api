import Users from '../../../entities/Users';
import UserRepository from '../../../repositories/UserRepository';
import { GetUserListPayload, SortByOption } from './typings';

export default class AdminUserServices {
  private userRepository = new UserRepository();

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
}
