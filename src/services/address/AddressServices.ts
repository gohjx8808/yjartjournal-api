import AddressRepository from '../../repositories/AddressRepository';
import {
  AddAddressPayload,
  DeleteAddressPayload,
  UpdateAddressPayload,
} from './typings';

export default class AddressServices {
  private addressRepository = new AddressRepository();

  validateTag = (tag: string) => {
    if (tag !== 'Work' && tag !== 'Home') {
      return false;
    }
    return true;
  };

  isAddressIdExist = async (userId: number, addressId: number) => {
    const addressAvailable = await this.addressRepository.getUserAddressById(
      userId,
      addressId,
    );

    return !!addressAvailable;
  };

  getAddressList = (userId: number) =>
    this.addressRepository.getUserAdresses(userId);

  private updateOtherAddressDefaultToFalse = async (userId: number) => {
    const existingAddresses = await this.getAddressList(userId);
    existingAddresses.map(async (address) => {
      await this.addressRepository.updateAddressDefaultToFalse(address.id);
    });
  };

  private oneDefaultAddressOnly = async (
    userId: number,
    payload: AddAddressPayload | UpdateAddressPayload,
  ) => {
    payload.isDefault = Boolean(payload.isDefault);
    if (payload.isDefault === true) {
      await this.updateOtherAddressDefaultToFalse(userId);
    }
  };

  addAddress = async (userId: number, payload: AddAddressPayload) => {
    await this.oneDefaultAddressOnly(userId, payload);
    const response = await this.addressRepository.insertNewAddress(
      payload,
      userId,
    );

    return response;
  };

  isAddressExist = async (userId: number, payload: AddAddressPayload) => {
    const existingAddresses =
      await this.addressRepository.getAddressWithExactDetails(userId, payload);

    return { id: existingAddresses?.id, exist: !!existingAddresses };
  };

  isAddressExistExceptSelfByUserId = async (
    userId: number,
    payload: UpdateAddressPayload,
  ) => {
    const existingAddressesExceptSelf =
      await this.addressRepository.getAddressWithExactDetailsExceptSelfByUserId(
        userId,
        payload,
      );

    return !!existingAddressesExceptSelf;
  };

  updateAddress = async (userId: number, payload: UpdateAddressPayload) => {
    await this.oneDefaultAddressOnly(userId, payload);

    const response = await this.addressRepository.updateAddressById(payload);

    return response;
  };

  deleteAddress = (payload: DeleteAddressPayload) =>
    this.addressRepository.deleteAddressById(payload.addressId);

  getAddressById = (addressId: number) =>
    this.addressRepository.getAddressById(addressId);
}
