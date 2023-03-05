import { manager } from '../dataSource';
import States from '../entities/States';

const stateManager = manager.getRepository(States);

export const getStateList = async () => {
  const result = await stateManager.createQueryBuilder().getMany();

  return result;
};
