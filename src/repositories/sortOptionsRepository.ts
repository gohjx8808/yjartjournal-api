import { manager } from '../dataSource';
import SortOptions from '../entities/SortOptions';

const sortOptionsManager = manager.getRepository(SortOptions);

export const getSortOptions = () => sortOptionsManager.find();
