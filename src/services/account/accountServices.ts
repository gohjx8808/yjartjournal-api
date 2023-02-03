import { userRepository } from '../../dataSource';

export const getUserAccount = async (userId: number) => {
  const userDetails = await userRepository
    .createQueryBuilder()
    .where({ id: userId })
    .getOne();

  return userDetails;
};
