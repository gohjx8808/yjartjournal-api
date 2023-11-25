import { manager } from '../dataSource';
import States from '../entities/States';

const stateManager = manager.getRepository(States);

export default class {
  getStateList = () => stateManager.find();
}
