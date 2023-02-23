import { Not } from 'typeorm';
import { addressRepository, stateRepository } from '../../dataSource';
import { Users } from '../../entities/Users';
import {
  AddAddressPayload,
  DeleteAddressPayload,
  UpdateAddressPayload,
} from './typings';

export const validateTag = (tag: string) => {
  if (tag !== 'Work' && tag !== 'Home') {
    return false;
  }
  return true;
};

export const getUserExistingAddressQuery = (user: Users) => {
  const existingAddresses = addressRepository
    .createQueryBuilder('addresses')
    .leftJoin('addresses.user', 'user')
    .leftJoinAndSelect('addresses.state', 'state')
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
  const existingAddresses = await getUserExistingAddressQuery(user)
    .orderBy({ 'addresses.updated_at': 'DESC' })
    .getMany();

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
  const response = await addressRepository.insert({
    ...payload,
    user,
    state: { id: payload.stateId },
  });

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
    state: { id: payload.stateId },
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
      state: { id: payload.stateId },
      country: payload.country,
      isDefault: payload.isDefault,
      tag: payload.tag,
    },
  );

  return response;
};

export const deleteAddress = async (payload: DeleteAddressPayload) => {
  const response = await addressRepository
    .createQueryBuilder()
    .delete()
    .where({ id: payload.addressId })
    .execute();

  return response;
};

export const getStateList = async () => {
  const states = await stateRepository.createQueryBuilder().getMany();

  return states.map((state) => ({ label: state.name, value: state.id }));
};
