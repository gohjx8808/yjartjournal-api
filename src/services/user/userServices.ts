import { userRepository } from '../../dataSource';
import { SignUpPayload } from './typings';

export const signUpUser = async (payload: SignUpPayload) => {
  const response = userRepository.insert(payload);

  return response;
};
