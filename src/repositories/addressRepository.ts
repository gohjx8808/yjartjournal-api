import { IsNull, Not } from 'typeorm';
import { manager } from '../dataSource';
import Addresses from '../entities/Addresses';
import Users from '../entities/Users';
import {
  AddAddressPayload,
  UpdateAddressPayload,
} from '../services/address/typings';

export const addressManager = manager.getRepository(Addresses);

export const getAddressByUserQuery = (user: Users) =>
  addressManager
    .createQueryBuilder('addresses')
    .leftJoin('addresses.user', 'user')
    .leftJoinAndSelect('addresses.state', 'state')
    .where('user.id = :id', { id: user.id });

export const getUserAdresses = (user: Users) =>
  getAddressByUserQuery(user)
    .orderBy({ 'addresses.updated_at': 'DESC' })
    .getMany();

export const getUserAddressById = (user: Users, addressId: number) =>
  getAddressByUserQuery(user)
    .andWhere({
      id: addressId,
    })
    .getOne();

export const updateAddressDefaultToFalse = (addressId: number) =>
  addressManager.update({ id: addressId }, { isDefault: false });

export const insertNewAddress = (payload: AddAddressPayload, user?: Users) =>
  addressManager.insert({
    ...payload,
    user,
  });

export const deleteAddressById = (addressId: number) =>
  addressManager
    .createQueryBuilder()
    .delete()
    .where({ id: addressId })
    .execute();

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

export const getAddressWithExactDetails = (
  user: Users,
  payload: AddAddressPayload,
) => getAddressWithExactDetailsQuery(user, payload).getOne();

export const getAddressWithExactDetailsExceptSelf = (
  user: Users,
  payload: UpdateAddressPayload,
) =>
  getAddressWithExactDetailsQuery(user, payload)
    .andWhere({ id: Not(payload.addressId) })
    .getOne();

export const updateAddressById = (payload: UpdateAddressPayload) =>
  addressManager.update(
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
