import { userRepository } from '../../dataSource';
import { UpdateAccountPayload } from './typings';

export const getUserAccount = async (userId: number) => {
  const userDetails = await userRepository
    .createQueryBuilder()
    .where({ id: userId })
    .select([
      'Users.id',
      'Users.name',
      'Users.preferredName',
      'Users.email',
      'Users.countryCode',
      'Users.phoneNumber',
      'Users.gender',
      'Users.dob',
    ])
    .getOne();

  return userDetails;
};

export const updateUserAccount = async (
  userId: number,
  payload: UpdateAccountPayload,
) => {
  const result = await userRepository.update({ id: userId }, payload);

  return result;
};
