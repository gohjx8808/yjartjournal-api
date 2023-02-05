import { addressRepository } from '../../dataSource';
import { Users } from '../../entities/Users';
import { AddAddressPayload } from './typings';

const getExistingAddress = (user: Users) => {
  const existingAddresses = addressRepository
    .createQueryBuilder('addresses')
    .leftJoin('addresses.user', 'user')
    .where('user.id = :id', { id: user.id });

  return existingAddresses;
};

export const getAddressList = async (user: Users) => {
  const existingAddresses = await getExistingAddress(user).getMany();

  return existingAddresses;
};

export const addAddress = async (user: Users, payload: AddAddressPayload) => {
  payload.isDefault = Boolean(payload.isDefault);
  if (payload.isDefault === true) {
    const existingAddresses = await getAddressList(user);
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
    .andWhere({
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
