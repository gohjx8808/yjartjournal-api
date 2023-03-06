import { manager } from '../dataSource';
import States from '../entities/States';

const stateManager = manager.getRepository(States);

export const getStateList = () => stateManager.createQueryBuilder().getMany();
