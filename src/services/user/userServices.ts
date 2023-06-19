import { sign } from 'jsonwebtoken';
import { encrypt } from '../../helpers/cryptoHelper';
import {
  getUserByEmail,
  insertNewUser,
  updatePasswordByUserId,
} from '../../repositories/userRepository';
import { SignInPayload, SignUpPayload } from './typings';
import UserRolesRepository from '../../repositories/UserRolesRepository';
import { AssignableRoles } from '../../entities/UserRoles';

const userRolesRepository = new UserRolesRepository();

export const signUpUser = async (payload: SignUpPayload) => {
  const encryptedPassword = encrypt(payload.password);

  const user = await insertNewUser(payload, encryptedPassword);

  await userRolesRepository.insertNew(
    user.identifiers[0].id,
    AssignableRoles.CUSTOMER,
  );

  return user;
};

export const generateAccessToken = async (payload: SignInPayload) => {
  const user = await getUserByEmail(payload.email);

  const accessToken = sign(
    { id: user.id, email: user.email },
    process.env.JWT_SIGN_TOKEN,
  );

  return { accessToken, user };
};

export const updateUserPassword = async (
  userId: number,
  newPassword: string,
) => {
  const encryptedNewPassword = encrypt(newPassword);

  await updatePasswordByUserId(userId, encryptedNewPassword);
};
