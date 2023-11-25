import StateRepository from '../repositories/StateRepositorya';

export default class {
  private stateRepository = new StateRepository();

  getAll = () => this.stateRepository.getStateList();
}
