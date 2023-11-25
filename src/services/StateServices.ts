import StateRepository from '../repositories/StateRepository';

export default class {
  private stateRepository = new StateRepository();

  getAll = () => this.stateRepository.getStateList();
}
