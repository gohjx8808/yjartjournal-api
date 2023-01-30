import { sign } from 'jsonwebtoken';
import { userRepository } from '../../dataSource';
import { encrypt } from '../../helpers/cryptoHelper';
import { SignInPayload, SignUpPayload } from './typings';

export const signUpUser = async (payload: SignUpPayload) => {
  const encryptedPassword = encrypt(payload.password);

  const response = userRepository.insert({
    ...payload,
    password: encryptedPassword.content,
    iv: encryptedPassword.iv,
  });

  return response;
};

export const generateAccessToken = async (payload: SignInPayload) => {
  const user = await userRepository
    .createQueryBuilder()
    .where({ email: payload.email })
    .getOne();
  const accessToken = sign(
    { email: user.email, gender: user.gender },
    process.env.JWT_SIGN_TOKEN,
  );

  return accessToken;
};
