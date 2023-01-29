import { userRepository } from '../../dataSource';
import { encrypt } from '../../helpers/cryptoHelper';
import { SignUpPayload } from './typings';

export const signUpUser = async (payload: SignUpPayload) => {
  const encryptedPassword = encrypt(payload.password);

  const response = userRepository.insert({
    ...payload,
    password: encryptedPassword.content,
    iv: encryptedPassword.iv,
  });

  return response;
};
