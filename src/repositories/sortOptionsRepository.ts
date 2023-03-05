import { manager } from '../dataSource';
import SortOptions from '../entities/SortOptions';

const sortOptionsManager = manager.getRepository(SortOptions);

export const getSortOptions = async () => {
  const sortData = await sortOptionsManager.find();

  return sortData;
};
