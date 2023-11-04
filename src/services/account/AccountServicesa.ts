import UserRepository from '../../repositories/UserRepositorya';
import { UpdateAccountPayload } from './typings';

export default class AccountServices {
  private userRepository = new UserRepository();

  getUserAccount(userId: number) {
    return this.userRepository.getUserById(userId);
  }

  updateUserAccount(userId: number, payload: UpdateAccountPayload) {
    return this.userRepository.updateUserById(userId, payload);
  }
}
