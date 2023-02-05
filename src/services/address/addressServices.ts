import { Not } from 'typeorm';
import { addressRepository } from '../../dataSource';
import { Users } from '../../entities/Users';
import { AddAddressPayload, UpdateAddressPayload } from './typings';

const getUserExistingAddressQuery = (user: Users) => {
  const existingAddresses = addressRepository
    .createQueryBuilder('addresses')
    .leftJoin('addresses.user', 'user')
    .where('user.id = :id', { id: user.id });

  return existingAddresses;
};

export const checkAddressIdExist = async (user: Users, addressId: number) => {
  const addressAvailable = await getUserExistingAddressQuery(user)
    .andWhere({
      id: addressId,
    })
    .getExists();

  return addressAvailable;
};

export const getAddressList = async (user: Users) => {
  const existingAddresses = await getUserExistingAddressQuery(user).getMany();

  return existingAddresses;
};

export const updateOtherAddressDefaultToFalse = async (user: Users) => {
  const existingAddresses = await getAddressList(user);
  existingAddresses.map(async (address) => {
    await addressRepository.update({ id: address.id }, { isDefault: false });
  });
};

export const oneDefaultAddressOnly = async (
  user: Users,
  payload: AddAddressPayload | UpdateAddressPayload,
) => {
  payload.isDefault = Boolean(payload.isDefault);
  if (payload.isDefault === true) {
    await updateOtherAddressDefaultToFalse(user);
  }
};

export const addAddress = async (user: Users, payload: AddAddressPayload) => {
  await oneDefaultAddressOnly(user, payload);
  const response = await addressRepository.insert({ user, ...payload });

  return response;
};

export const checkAddressQuery = (
  user: Users,
  payload: AddAddressPayload | UpdateAddressPayload,
) => {
  const filterAddressQuery = getUserExistingAddressQuery(user).andWhere({
    receiverName: payload.receiverName,
    receiverCountryCode: payload.receiverCountryCode,
    receiverPhoneNumber: payload.receiverPhoneNumber,
    addressLineOne: payload.addressLineOne,
    addressLineTwo: payload.addressLineTwo,
    postcode: payload.postcode,
    city: payload.city,
    state: payload.state,
    country: payload.country,
  });

  return filterAddressQuery;
};

export const checkAddressExist = async (
  user: Users,
  payload: AddAddressPayload,
) => {
  const existingAddresses = await checkAddressQuery(user, payload).getMany();

  return existingAddresses.length > 0;
};

export const checkAddressExistExceptSelf = async (
  user: Users,
  payload: UpdateAddressPayload,
) => {
  const existingAddressesExceptSelf = await checkAddressQuery(user, payload)
    .andWhere({ id: Not(payload.addressId) })
    .getMany();

  return existingAddressesExceptSelf.length > 0;
};

export const updateAddress = async (
  user: Users,
  payload: UpdateAddressPayload,
) => {
  await oneDefaultAddressOnly(user, payload);

  const response = await addressRepository.update(
    { id: payload.addressId },
    {
      receiverName: payload.receiverName,
      receiverCountryCode: payload.receiverCountryCode,
      receiverPhoneNumber: payload.receiverPhoneNumber,
      addressLineOne: payload.addressLineOne,
      addressLineTwo: payload.addressLineTwo,
      postcode: payload.postcode,
      city: payload.city,
      state: payload.state,
      country: payload.country,
      isDefault: payload.isDefault,
      tag: payload.tag,
    },
  );

  return response;
};
