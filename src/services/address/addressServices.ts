import { addressRepository } from '../../dataSource';
import { Users } from '../../entities/Users';
import { AddAddressPayload } from './typings';

const getExistingAddress = (user: Users) => {
  const existingAddresses = addressRepository
    .createQueryBuilder('addresses')
    .leftJoinAndSelect('addresses.user', 'user')
    .where('user.id = :id', { id: user.id });

  return existingAddresses;
};

export const addAddress = async (user: Users, payload: AddAddressPayload) => {
  payload.isDefault = Boolean(payload.isDefault);
  if (payload.isDefault === true) {
    const existingAddresses = await getExistingAddress(user).getMany();
    existingAddresses.map(async (address) => {
      await addressRepository.update({ id: address.id }, { isDefault: false });
    });
  }
  const response = await addressRepository.insert({ user, ...payload });

  return response;
};

export const checkAddressExist = async (
  user: Users,
  payload: AddAddressPayload,
) => {
  const existingAddresses = await getExistingAddress(user)
    .where({
      receiverName: payload.receiverName,
      receiverCountryCode: payload.receiverCountryCode,
      receiverPhoneNumber: payload.receiverPhoneNumber,
      addressLineOne: payload.addressLineOne,
      addressLineTwo: payload.addressLineTwo,
      postcode: payload.postcode,
      city: payload.city,
      state: payload.state,
      country: payload.country,
    })
    .getMany();

  return existingAddresses.length > 0;
};
