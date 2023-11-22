import UserRolesRepository from '../../repositories/UserRolesRepository';
export default class UserRoleServices {
  private userRolesRepository = new UserRolesRepository();

  getById = (userId: number) => this.userRolesRepository.getByUserId(userId);
}
