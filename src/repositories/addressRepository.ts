import { IsNull, Not } from 'typeorm';
import { manager } from '../dataSource';
import Addresses from '../entities/Addresses';
import {
  AddAddressPayload,
  UpdateAddressPayload,
} from '../services/address/typings';

export const addressManager = manager.getRepository(Addresses);

export const getAddressByUserIdQuery = (userId: number) =>
  addressManager
    .createQueryBuilder('addresses')
    .leftJoin('addresses.user', 'user')
    .leftJoinAndSelect('addresses.state', 'state')
    .where('user.id = :id', { id: userId });

export const getUserAdresses = (userId: number) =>
  getAddressByUserIdQuery(userId)
    .orderBy({ 'addresses.updated_at': 'DESC' })
    .getMany();

export const getUserAddressById = (userId: number, addressId: number) =>
  getAddressByUserIdQuery(userId)
    .andWhere({
      id: addressId,
    })
    .getOne();

export const updateAddressDefaultToFalse = (addressId: number) =>
  addressManager.update({ id: addressId }, { isDefault: false });

export const insertNewAddress = (payload: AddAddressPayload, userId?: number) =>
  addressManager.insert({
    ...payload,
    user: { id: userId },
  });

export const deleteAddressById = (addressId: number) =>
  addressManager
    .createQueryBuilder()
    .delete()
    .where({ id: addressId })
    .execute();

export const getAddressWithExactDetailsQuery = (
  userId: number,
  payload: AddAddressPayload | UpdateAddressPayload,
) => {
  let filterAddressQuery = getAddressByUserIdQuery(userId).andWhere({
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
  userId: number,
  payload: AddAddressPayload,
) => getAddressWithExactDetailsQuery(userId, payload).getOne();

export const getAddressWithExactDetailsExceptSelf = (
  userId: number,
  payload: UpdateAddressPayload,
) =>
  getAddressWithExactDetailsQuery(userId, payload)
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

export const getAddressById = (addressId: number) =>
  addressManager.findOne({ where: { id: addressId }, relations: ['state'] });
