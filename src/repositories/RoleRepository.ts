import { manager } from '../dataSource';
import Roles from '../entities/Roles';

const roleManager = manager.getRepository(Roles);

export default class RoleRepository {
  findById = async (roleId: number) => {
    const result = await roleManager.findOneBy({ id: roleId });

    return result;
  };
}
