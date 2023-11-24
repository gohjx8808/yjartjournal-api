import { IsNull, Not } from 'typeorm';
import { manager } from '../dataSource';
import Addresses from '../entities/Addresses';
import {
  AddAddressPayload,
  UpdateAddressPayload,
} from '../services/address/typings';

export const addressManager = manager.getRepository(Addresses);

export default class AddressRepository {
  private getAddressByUserIdQuery = (userId: number) =>
    addressManager
      .createQueryBuilder('addresses')
      .leftJoin('addresses.user', 'user')
      .leftJoinAndSelect('addresses.state', 'state')
      .where('user.id = :id', { id: userId });

  getUserAdresses = (userId: number) =>
    this.getAddressByUserIdQuery(userId)
      .orderBy({ 'addresses.updated_at': 'DESC' })
      .getMany();

  getUserAddressById = (userId: number, addressId: number) =>
    this.getAddressByUserIdQuery(userId)
      .andWhere({
        id: addressId,
      })
      .getOne();

  updateAddressDefaultToFalse = (addressId: number) =>
    addressManager.update({ id: addressId }, { isDefault: false });

  insertNewAddress = (payload: AddAddressPayload, userId?: number) =>
    addressManager.insert({
      ...payload,
      user: { id: userId },
    });

  deleteAddressById = (addressId: number) =>
    addressManager
      .createQueryBuilder()
      .delete()
      .where({ id: addressId })
      .execute();

  private getAddressWithExactDetailsQueryByUserId = (
    userId: number,
    payload: AddAddressPayload | UpdateAddressPayload,
  ) => {
    let filterAddressQuery = this.getAddressByUserIdQuery(userId).andWhere({
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

  getAddressWithExactDetails = (userId: number, payload: AddAddressPayload) =>
    this.getAddressWithExactDetailsQueryByUserId(userId, payload).getOne();

  getAddressWithExactDetailsExceptSelfByUserId = (
    userId: number,
    payload: UpdateAddressPayload,
  ) =>
    this.getAddressWithExactDetailsQueryByUserId(userId, payload)
      .andWhere({ id: Not(payload.addressId) })
      .getOne();

  updateAddressById = (payload: UpdateAddressPayload) =>
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

  getAddressById = (addressId: number) =>
    addressManager.findOne({ where: { id: addressId }, relations: ['state'] });
}
