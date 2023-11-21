import { In } from 'typeorm';
import { manager } from '../dataSource';
import UserRoles from '../entities/UserRoles';

const userRolesManager = manager.getRepository(UserRoles);

export default class UserRolesRepository {
  insertNew = (userId: number, roleId: number) =>
    userRolesManager.insert({
      user: { id: userId },
      role: { id: roleId },
    });

  existByRoleIdsAndUserId = (roleIds: number[], userId: number) =>
    userRolesManager.exist({
      where: { user: { id: userId }, role: { id: In(roleIds) } },
    });

  existByUserRoleId = (userRoleId: number) =>
    userRolesManager.exist({
      where: { id: userRoleId },
    });

  deleteById = (userRoleId: number) =>
    userRolesManager.delete({ id: userRoleId });

  getByUserId = (userId: number) =>
    userRolesManager.find({
      where: { user: { id: userId } },
      relations: ['role'],
    });
}
