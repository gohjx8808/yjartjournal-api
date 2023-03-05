import { IsNull, Not } from 'typeorm';
import { manager } from '../dataSource';
import Addresses from '../entities/Addresses';
import Users from '../entities/Users';
import {
  AddAddressPayload,
  UpdateAddressPayload,
} from '../services/address/typings';

export const addressManager = manager.getRepository(Addresses);

export const getAddressByUserQuery = (user: Users) => {
  const userAddresses = addressManager
    .createQueryBuilder('addresses')
    .leftJoin('addresses.user', 'user')
    .leftJoinAndSelect('addresses.state', 'state')
    .where('user.id = :id', { id: user.id });

  return userAddresses;
};

export const getUserAdresses = async (user: Users) => {
  const existingAddresses = await getAddressByUserQuery(user)
    .orderBy({ 'addresses.updated_at': 'DESC' })
    .getMany();

  return existingAddresses;
};

export const getUserAddressById = async (user: Users, addressId: number) => {
  const result = await getAddressByUserQuery(user)
    .andWhere({
      id: addressId,
    })
    .getOne();

  return result;
};

export const updateAddressDefaultToFalse = async (addressId: number) => {
  await addressManager.update({ id: addressId }, { isDefault: false });
};

export const insertNewAddress = async (
  payload: AddAddressPayload,
  user?: Users,
) => {
  const result = await addressManager.insert({
    ...payload,
    user,
  });

  return result;
};

export const deleteAddressById = async (addressId: number) => {
  const result = await addressManager
    .createQueryBuilder()
    .delete()
    .where({ id: addressId })
    .execute();

  return result;
};

export const getAddressWithExactDetailsQuery = (
  user: Users,
  payload: AddAddressPayload | UpdateAddressPayload,
) => {
  let filterAddressQuery = getAddressByUserQuery(user).andWhere({
    receiverName: payload.receiverName,
    receiverCountryCode: payload.receiverCountryCode,
    receiverPhoneNumber: payload.receiverPhoneNumber,
    addressLineOne: payload.addressLineOne,
    postcode: payload.postcode,
    city: payload.city,
    state: payload.state,
    country: payload.country,
  });

  if (payload.addressLineTwo === null) {
    filterAddressQuery = filterAddressQuery.andWhere({
      addressLineTwo: IsNull(),
    });
  } else {
    filterAddressQuery = filterAddressQuery.andWhere({
      addressLineTwo: payload.addressLineTwo,
    });
  }

  return filterAddressQuery;
};

export const getAddressWithExactDetails = async (
  user: Users,
  payload: AddAddressPayload,
) => {
  const result = await getAddressWithExactDetailsQuery(user, payload).getOne();

  return result;
};

export const getAddressWithExactDetailsExceptSelf = async (
  user: Users,
  payload: UpdateAddressPayload,
) => {
  const result = await getAddressWithExactDetailsQuery(user, payload)
    .andWhere({ id: Not(payload.addressId) })
    .getOne();

  return result;
};

export const updateAddressById = async (payload: UpdateAddressPayload) => {
  const result = await addressManager.update(
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

  return result;
};
