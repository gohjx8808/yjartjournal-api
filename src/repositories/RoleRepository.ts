import { In, Not } from 'typeorm';
import { manager } from '../dataSource';
import Roles from '../entities/Roles';

const roleManager = manager.getRepository(Roles);

export default class RoleRepository {
  getAll = () => roleManager.find();

  findById = (roleId: number) => roleManager.findOneBy({ id: roleId });

  getUnassignRoles = (roleIds: number[]) =>
    roleManager.findBy({ id: Not(In(roleIds)) });
}
