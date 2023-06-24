import { In } from 'typeorm';
import { manager } from '../dataSource';
import UserRoles from '../entities/UserRoles';

const userRolesManager = manager.getRepository(UserRoles);

export default class UserRolesRepository {
  insertNew = async (userId: number, roleId: number) => {
    await userRolesManager.insert({
      user: { id: userId },
      role: { id: roleId },
    });
  };

  existByRoleIdsAndUserId = async (roleIds: number[], userId: number) => {
    const result = await userRolesManager.exist({
      where: { user: { id: userId }, role: { id: In(roleIds) } },
    });

    return result;
  };
}
